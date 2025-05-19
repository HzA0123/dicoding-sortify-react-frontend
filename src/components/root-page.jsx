import {NavLink, Outlet, useLocation, useNavigation} from "react-router-dom";
import {
	BellIcon,
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
		<div className="flex ">
			<Sidebar/>
			<div className="flex flex-col w-screen ">
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
	return (
		<ul
			className="menu bg-base-200 rounded-box min-w-44  m-1 h-screen">
			<li>
				<div className="my-10">

					Item Post
				</div>

			</li>
			<li>
				<NavLink
					className={({isActive}) => isActive ? 'menu-active' : ''}
					to={'/'}>Overview</NavLink></li>
			<li><NavLink
				className={({isActive}) => isActive ? 'menu-active' : ''}
				to={'/dashboard'}><LayoutDashboardIcon/> Dashboard</NavLink></li>
			<li><NavLink
				className={({isActive}) => isActive ? 'menu-active' : ''}
				to={'/customers'}><UserIcon/> Customers</NavLink></li>
			<li><NavLink
				className={({isActive}) => isActive ? 'menu-active' : ''}
				to={'/setting'}><SettingsIcon/> Setting</NavLink></li>
			<li><NavLink
				className={({isActive}) => isActive ? 'menu-active' : ''}
				to={'/message'}><MessagesSquareIcon/> Messages</NavLink></li>

			{/*<li>*/}
			{/*	<details open>*/}
			{/*		<summary>Parent</summary>*/}
			{/*		<ul>*/}
			{/*			<li><a>Submenu 1</a></li>*/}
			{/*			<li><a>Submenu 2</a></li>*/}
			{/*			<li>*/}
			{/*				<details open>*/}
			{/*					<summary>Parent</summary>*/}
			{/*					<ul>*/}
			{/*						<li><a>Submenu 1</a></li>*/}
			{/*						<li><a>Submenu 2</a></li>*/}
			{/*					</ul>*/}
			{/*				</details>*/}
			{/*			</li>*/}
			{/*		</ul>*/}
			{/*	</details>*/}
			{/*</li>*/}
		</ul>
	);
}

