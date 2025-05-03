import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/GetStarted";
import Register from "./pages/Register/Register";
// import Dashboard from "./components/pages/Dashboard";
// import Projects from "./components/pages/Projects";
// import Profile from "./components/pages/Profile";
import AppLayout from "./components/Layout/UnauthorizedLayout/AppLayout";
import RegisterVolunteer from "./pages/Register/RegisterVolunteer";
import RegisterOrganizer from "./pages/Register/RegisterOrganizer";
import Login from "./pages/Login/Login";
import AuthLayout from "./components/Layout/AuthorizedLayout/AuthLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
// import AuthLayout from "./components/Layout/AuthorizedLayout/AuthLayout";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <AppLayout />, // Unauthenticated Layout
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/register/user", element: <Register /> },
				{ path: "/register/volunteer", element: <RegisterVolunteer /> },
				{ path: "/register/organizer", element: <RegisterOrganizer /> },
				{ path: "/login/user", element: <Login /> },
			],
		},
		{
			path: "/dashboard",
			element: <AuthLayout />, // Authenticated Layout with Sidebar
			children: [
				{ path: "/dashboard", element: <Dashboard /> },
				// { path: "/projects", element: <Projects /> },
				// { path: "/profile", element: <Profile /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
