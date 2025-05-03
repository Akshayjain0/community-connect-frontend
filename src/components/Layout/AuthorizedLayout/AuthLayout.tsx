import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AuthLayout() {
	return (
		<div className='flex flex-col min-h-svh'>
			{/* Sticky Top Navbar */}
			<header className='sticky top-0 z-50'>
				<Navbar />
			</header>

			{/* Scrollable main content */}
			<main className='flex-1 overflow-y-auto'>
				<Outlet />
			</main>

			{/* Optional Footer */}
			{/* <footer className='bg-gray-500 h-10'>
				<Footer />
			</footer> */}
		</div>
	);
}
