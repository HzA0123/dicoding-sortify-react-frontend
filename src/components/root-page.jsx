import React from "react";
import {
  BookIcon,
  ChartBarIcon,
  CogIcon,
  LeafIcon,
  BellIcon,
  InfoIcon,
  LayersIcon,
  LayoutDashboardIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  LogOutIcon
} from "lucide-react";
import { LoadingComponent } from "./loading.jsx";
import { Outlet, NavLink, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { isLoggedIn, setLoggedIn } from "../utils/auth";
import { useEffect, useSyncExternalStore } from "react";

export function Root() {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  // Redirect ke login jika belum login
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  // Subscribe to localStorage changes for login state
  function subscribe(callback) {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }
  const loggedIn = useSyncExternalStore(subscribe, () => isLoggedIn());
  return loggedIn ? (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static lg:flex-shrink-0 z-30 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow min-h-screen w-full">
        <div className="sticky top-0 z-20">
          <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} />
        </div>
        <div className="m-1 flex-grow overflow-x-hidden">
          {navigation.state === "loading" && <LoadingComponent />}
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
}

function Sidebar() {
  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboardIcon size={20} />, text: 'Dashboard' },
    { path: '/classification', icon: <LayersIcon size={20} />, text: 'Klasifikasi' },
    { path: '/education', icon: <BookIcon size={20} />, text: 'Edukasi' },
    // Statistik dihapus
    { path: '/tentang', icon: <InfoIcon size={20} />, text: 'Tentang' },
    { path: '/profile', icon: <CogIcon size={20} />, text: 'Pengaturan' },
  ];
  const [showLogout, setShowLogout] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  // Fetch nama user dari API profile
  React.useEffect(() => {
    async function fetchProfile() {
      if (!loggedIn) {
        setUserName('');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://backend-sortify-t7yen6klxa-et.a.run.app/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        console.log('Profile API response:', data);
        if (data && data.profile && data.profile.name) {
          setUserName(data.profile.name);
        } else {
          setUserName('');
        }
      } catch {
        setUserName('');
      }
    }
    fetchProfile();
  }, [loggedIn]);
  // Hapus argumen path jika tidak dipakai
  const handleMenuClick = (e) => {
    if (!loggedIn) {
      e.preventDefault();
      navigate("/login");
    }
  };
  const handleLogout = () => {
    setShowLogout(false);
    setLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
    navigate("/");
  };
  return (
    <ul className="menu bg-white w-64 p-4 flex flex-col h-screen shadow-md sticky top-0">
      <div>
        <li className="menu-title mb-6">
          <div className="flex items-center text-green-700 font-bold text-lg">
            <LeafIcon size={24} className="mr-2" />
            Sortify AI Eco Platform
          </div>
        </li>
        <li>
          <span className="font-semibold text-gray-500 text-sm">Menu Utama</span>
        </li>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50'
              }
              to={item.path}
              onClick={handleMenuClick}
              style={!loggedIn && item.path !== "/" && item.path !== "/profile" ? { pointerEvents: "auto", opacity: 0.5, cursor: "not-allowed" } : {}}
            >
              {item.icon}
              {item.text}
            </NavLink>
          </li>
        ))}
      </div>
      {/* User Profile Section always visible at the bottom */}
      <div className="border-t border-gray-200 pt-4 mt-auto sticky bottom-0 bg-white">
        <div className="flex items-center justify-between">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-green-100 text-green-700 font-semibold flex items-center p-2 rounded-md' : 'text-gray-700 hover:bg-green-50 flex items-center p-2 rounded-md'
            }
            to={loggedIn ? "/profile" : "/login"}
            onClick={e => {
              if (!loggedIn) {
                e.preventDefault();
                navigate("/login");
              }
            }}
          >
            <UserIcon size={24} className="mr-3 text-green-600" />
            <div>
              <p className="font-bold">{userName || 'User'}</p>
            </div>
          </NavLink>
          <button
            className="btn btn-ghost btn-circle ml-2"
            title="Logout"
            onClick={() => setShowLogout(true)}
          >
            <LogOutIcon className="text-red-500" />
          </button>
        </div>
        {showLogout && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-white/30">
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl w-[90%] max-w-md mx-auto text-center border-2 border-green-200">
              <p className="mb-6 text-xl md:text-2xl font-bold text-gray-800">Yakin ingin keluar?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                <button className="btn btn-error w-full sm:w-auto text-base" onClick={handleLogout}>Keluar</button>
                <button className="btn btn-outline w-full sm:w-auto text-base" onClick={() => setShowLogout(false)}>Batal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ul>
  );
}

export function Navbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.split("/").slice(1);
  const pathCrumbs = pathname.map((_, idx) => "/" + pathname.slice(0, idx + 1).join("/"));

  return (
    <div className="navbar bg-base-200 m-1 rounded-box px-2 md:px-5">
      <div className="flex-1 items-center">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="btn btn-ghost btn-circle">
            <MenuIcon />
          </button>
          <div className="breadcrumbs text-sm capitalize hidden sm:inline-block">
            <ul className="flex items-center">
              {pathname.map((item, index) => (
                <li key={item} className="flex items-center">
                  <NavLink to={pathCrumbs[index]} className="flex items-center h-full">
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-none mr-2">
        <button
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar"
          onClick={() => {
            if (isLoggedIn()) {
              navigate('/profile');
            } else {
              navigate('/login');
            }
          }}
        >
          <div className="w-10 rounded-full">
            <img
              alt="User profile"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </button>
      </div>
    </div>
  );
}