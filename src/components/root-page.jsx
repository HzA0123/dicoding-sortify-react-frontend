import {NavLink, Outlet, useLocation, useNavigation} from "react-router-dom";
import {
	BookIcon,
	CalendarCheckIcon,
	ChartBarIcon,
	ClipboardListIcon,
	CogIcon,
	LeafIcon,
	BellIcon,
	HomeIcon,
	InfoIcon,
	LayersIcon,
	LayoutDashboardIcon,
	MenuIcon,
	MessagesSquareIcon,
	SearchIcon,
	SettingsIcon,
	UserIcon
} from "lucide-react";
import {LoadingComponent} from "./loading.jsx";

export function Root() {
	const navigation = useNavigation();
	return (
		<div className="flex min-h-screen bg-gray-100"> {/* Added min-h-screen and background */}
			<Sidebar />
			<div className="flex flex-col flex-grow"> {/* Changed w-screen to flex-grow */}
				<Navbar/>
				<div className="m-1">
					{navigation.state === "loading" && <LoadingComponent/>}
					<Outlet/>
				</div>
			</div>
		</div>
	)
}


export function Navbar() {

	const location = useLocation();
	// const pathname=location.pathname.split("/").pop()
	const pathname = location.pathname.split("/").slice(1)
	const pathCrumbs = pathname.map((_, idx) => "/" + pathname.slice(0, idx + 1).join("/"));

	return (
		<div className="navbar bg-base-200 m-1 rounded-box px-5  ">
			<div className="navbar-start space-x-3">
				<MenuIcon/>
				<div className="breadcrumbs text-sm capitalize">
					<ul>
						{pathname.map((item,index) => (
							<li key={item}>
								<NavLink to={pathCrumbs[index]}>
									{item}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="navbar-center ">
				<div className="join rounded">
					<input type={'search'} placeholder={'Search'} className="input join-item rounded-l-full"/>
					<button type={'button'} className={'btn join-item btn-neutral rounded-r-full'}><SearchIcon/></button>
				</div>

			</div>
			<div className="navbar-end space-x-2">
				<BellIcon/>
				<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
					</div>
				</div>
			</div>
		</div>

	)
}


export function Sidebar() {
	const menuItems = [
		{ path: '/dashboard', icon: <LayoutDashboardIcon size={20} />, text: 'Dashboard' },
		{ path: 'classification', icon: <LayersIcon size={20} />, text: 'Klasifikasi' }, // Placeholder icon
		{ path: '/education', icon: <BookIcon size={20} />, text: 'Edukasi' }, // Placeholder icon
		{ path: '/statistik', icon: <ChartBarIcon size={20} />, text: 'Statistik' }, // Placeholder icon
		{ path: '/tentang', icon: <InfoIcon size={20} />, text: 'Tentang' }, // Placeholder icon
		{ path: '/profile', icon: <CogIcon size={20} />, text: 'Pengaturan' }, // Changed path to /profile for settings
	];

	return (
		<ul
			className="menu bg-white w-64 p-4 flex flex-col justify-between shadow-md"> {/* Adjusted styling for white background and shadow */}
			<div> {/* Wrapper for logo and menu items */}
				<li className="menu-title mb-6"> {/* Added margin-bottom */}
					<div className="flex items-center text-green-700 font-bold text-lg"> {/* Styling for logo */}
						<LeafIcon size={24} className="mr-2"/> {/* Placeholder icon for logo */}
						Sortify AI Eco Platform
					</div>
				</li>

				<li> {/* Menu Utama Header */}
					<span className="font-semibold text-gray-500 text-sm">Menu Utama</span>
				</li>

				{menuItems.map((item) => (
					<li key={item.path}>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50'
							}
							to={item.path}
						>
							{item.icon}
							{item.text}
						</NavLink>
					</li>
				))}
			</div>

			{/* User Profile Section at the bottom */}
			<div className="border-t border-gray-200 pt-4"> {/* Added border top and padding */}
				<NavLink
					className={({ isActive }) =>
						isActive ? 'bg-green-100 text-green-700 font-semibold flex items-center p-2 rounded-md' : 'text-gray-700 hover:bg-green-50 flex items-center p-2 rounded-md'
					}
					to="/profile" // Link to profile page
				>
					<UserIcon size={24} className="mr-3 text-green-600" /> {/* User icon */}
					<div>
						<p className="font-bold">Eco Warrior</p>
						<p className="text-sm text-gray-500">Level 5 • 12.470 poin</p>
					</div>
				</NavLink>
			</div>
		</ul>
	);
}

