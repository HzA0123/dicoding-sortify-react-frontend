
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/error-page.jsx";
import { Root } from "./components/root-page.jsx";
import Dashboard from "./page/dashboard.jsx";
import Classification from "./page/classification.jsx";
import Education from "./page/education.jsx";
// import Statistik from "./page/statistik.jsx";
import Profile from "./page/profile.jsx";
import AboutPage from "./page/about.jsx";
import AuthPage from "./page/auth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";



export const router = createBrowserRouter([
  {
	path: "/",
	element: <Root />,
	errorElement: <ErrorPage />,
	children: [
	  {
		path: "",
		element: <AuthPage />,
	  },
	  {
		path: "login",
		element: <AuthPage />,
	  },
	  {
		path: "dashboard",
		element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
		children: [
		  {
			path: "test1",
			element: <h1>Test Page 2</h1>,
			children: [
			  {
				path: "test2",
				element: <h1>Test Page 2</h1>,
			  },
			],
		  },
		],
	  },
	  {
		path: "profile",
		element: <ProtectedRoute><Profile /></ProtectedRoute>,
	  },
	  {
		path: "customers",
		element: <ProtectedRoute><Profile /></ProtectedRoute>,
	  },
	  {
		path: "classification",
		element: <ProtectedRoute><Classification /></ProtectedRoute>,
	  },
	  {
		path: "education",
		element: <ProtectedRoute><Education /></ProtectedRoute>,
	  },
	  // Statistik page dihapus
	  {
		path: "about",
		element: <ProtectedRoute><AboutPage /></ProtectedRoute>,
	  },
	  {
		path: "tentang",
		element: <ProtectedRoute><AboutPage /></ProtectedRoute>,
	  },
	],
  },
]);

