import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
// import Dashboard from "./components/pages/Dashboard";
// import Projects from "./components/pages/Projects";
// import Profile from "./components/pages/Profile";
import AppLayout from "./components/Layout/UnauthorizedLayout/AppLayout";
import RegisterVolunteer from "./pages/Register/RegisterVolunteer";
import RegisterOrganizer from "./pages/Register/RegisterOrganizer";
import Login from "./pages/Login/Login";
import AuthLayout from "./components/Layout/AuthorizedLayout/AuthLayout";
// import Dashboard from "./pages/Dashboard/Dashboard";
import { Toaster } from "./components/ui/sonner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import VolunteerDashboard from "./components/dashboards/volunteer/VolunteerDashboard";
import OrganizerDashboard from "./components/dashboards/organizer/OrganizerDashboard";
import { useAuth } from "@/context/AuthContext";
import { PublicRoute } from "./components/PublicRoute";
// import AuthLayout from "./components/Layout/AuthorizedLayout/AuthLayout";

function App() {
	const { loading } = useAuth();
	// const router = createBrowserRouter([
	// 	{
	// 		path: "/",
	// 		element: <AppLayout />, // Unauthenticated Layout
	// 		children: [
	// 			{ path: "/", element: <Home /> },
	// 			{ path: "/register/user", element: <Register /> },
	// 			{ path: "/register/volunteer", element: <RegisterVolunteer /> },
	// 			{ path: "/register/organizer", element: <RegisterOrganizer /> },
	// 			{ path: "/login/user", element: <Login /> },
	// 		],
	// 	},
	// 	{
	// 		path: "/dashboard",
	// 		element: <AuthLayout />, // Authenticated Layout with Sidebar
	// 		children: [{ path: "/dashboard", element: <Dashboard /> }],
	// 	},
	// ]);
	if (loading) {
		// Prevent route rendering until auth is fully ready
		return <div>Loading...</div>;
	}

	const router = createBrowserRouter([
		{
			path: "/",
			element: <AppLayout />,
			children: [
				{
					path: "/",
					element: (
						<PublicRoute>
							<Home />
						</PublicRoute>
					),
				},
				{
					path: "/register/user",
					element: (
						<PublicRoute>
							<Register />
						</PublicRoute>
					),
				},
				{
					path: "/register/volunteer",
					element: (
						<PublicRoute>
							<RegisterVolunteer />
						</PublicRoute>
					),
				},
				{
					path: "/register/organizer",
					element: (
						<PublicRoute>
							<RegisterOrganizer />
						</PublicRoute>
					),
				},
				{
					path: "/login/user",
					element: (
						<PublicRoute>
							<Login />
						</PublicRoute>
					),
				},
			],
		},
		{
			path: "/volunteer",
			element: <AuthLayout />, // Sidebar, etc
			children: [
				{
					path: "dashboard",
					element: (
						<ProtectedRoute allowedRoles={["volunteer"]}>
							<VolunteerDashboard />
						</ProtectedRoute>
					),
				},
				// other volunteer-only routes
			],
		},
		{
			path: "/organizer",
			element: <AuthLayout />,
			children: [
				{
					path: "dashboard",
					element: (
						<ProtectedRoute allowedRoles={["organizer"]}>
							<OrganizerDashboard />
						</ProtectedRoute>
					),
				},
				// organizer-only routes
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
			<Toaster richColors />
		</>
	);
}

export default App;
