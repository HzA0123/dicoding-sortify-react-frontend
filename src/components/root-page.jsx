
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
    <div className="flex min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div className="sticky top-0 h-screen flex-shrink-0 z-30">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col flex-grow min-h-screen">
        <div className="sticky top-0 z-20">
          <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} />
        </div>
        <div className="m-1 flex-grow">
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
        const res = await fetch('http://localhost:3000/api/user/profile', {
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
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
            <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center scale-105 animate-pop-up border-2 border-green-200">
              <p className="mb-6 text-2xl font-bold text-gray-800">Yakin ingin keluar?</p>
              <div className="flex justify-center gap-6">
                <button className="btn btn-error btn-lg px-8 text-lg" onClick={handleLogout}>Keluar</button>
                <button className="btn btn-outline btn-lg px-8 text-lg" onClick={() => setShowLogout(false)}>Batal</button>
              </div>
            </div>
            <style>{`
              @keyframes pop-up {
                0% { transform: scale(0.9); opacity: 0; }
                100% { transform: scale(1.05); opacity: 1; }
              }
              .animate-pop-up {
                animation: pop-up 0.25s cubic-bezier(.4,2,.6,1) both;
              }
            `}</style>
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
    <div className="navbar bg-base-200 m-1 rounded-box px-5">
      <div className="navbar-start space-x-3">
        <button onClick={onMenuClick} className="btn btn-ghost btn-circle">
          <MenuIcon />
        </button>
        <div className="breadcrumbs text-sm capitalize">
          <ul>
            {pathname.map((item, index) => (
              <li key={item}>
                <NavLink to={pathCrumbs[index]}>{item}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center ">
        <div className="join rounded">
          <input type={'search'} placeholder={'Search'} className="input join-item rounded-l-full" />
          <button type={'button'} className={'btn join-item btn-neutral rounded-r-full'}><SearchIcon /></button>
        </div>
      </div>
      <div className="navbar-end space-x-2">
        <BellIcon />
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
