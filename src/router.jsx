import {createBrowserRouter} from "react-router-dom";
import {ErrorPage} from "./components/error-page.jsx";
import {Root} from "./components/root-page.jsx";
import Dashboard from "./page/dashboard.jsx";
import Classification from "./page/classification.jsx";
import Education from "./page/education.jsx";
import Profile from "./page/profile.jsx";

export const router = createBrowserRouter([
	{
		path        : "/",
		element     : <Root/>,
		errorElement: <ErrorPage/>,
		children    : [
			{
				path    : 'dashboard',
				element : <Dashboard/>,
				children: [{
					path    : 'test1',
					element : <h1>Test Page 2</h1>,
					children: [{
						path   : 'test2',
						element: <h1>Test Page 2</h1>,
					}]
				}]
			},
			{
				path: 'profile',
				element: <Profile/>
			},
			{
				path: 'customers',
				element: <Profile/>
			},
			{
				path: 'classification',
				element: <Classification/>
			},
			{
				path: 'education', 
				element: <Education/> 
			},

		]
	},
]);

