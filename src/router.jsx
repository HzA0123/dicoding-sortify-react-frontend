
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/error-page.jsx";
import { Root } from "./components/root-page.jsx";
import Dashboard from "./page/dashboard.jsx";
import Classification from "./page/classification.jsx";
import Education from "./page/education.jsx";
import Statistik from "./page/statistik.jsx";
import Profile from "./page/profile.jsx";
import AboutPage from "./page/about.jsx";
import AuthPage from "./page/auth.jsx";



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
		path: "dashboard",
		element: <Dashboard />,
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
		element: <Profile />,
	  },
	  {
		path: "customers",
		element: <Profile />,
	  },
	  {
		path: "classification",
		element: <Classification />,
	  },
	  {
		path: "education",
		element: <Education />,
	  },
	  {
		path: "statistik",
		element: <Statistik />,
	  },
	  {
		path: "about",
		element: <AboutPage />,
	  },
	  {
		path: "tentang",
		element: <AboutPage />,
	  },
	],
  },
]);

