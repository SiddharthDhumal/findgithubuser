import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Userinfo from "./components/Userinfo/Userinfo.js";
import Home from "./components/Home/Home";
import Followerslist from "./components/FollowersList/Followerslist.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/userinfo",
		element: <Userinfo />,
	},
	{
		path: "/followerslist",
		element: <Followerslist />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
