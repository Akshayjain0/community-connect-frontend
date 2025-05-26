/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
import { LogOut } from "lucide-react";
import RaiseHandLogo from "/images/RaiseHand.webp";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// const navLinksVolunteer = [
// 	{ name: "Home", href: "/" },
// 	{ name: "Feed", href: "/feed" },
// 	{ name: "Stats", href: "/stats" },
// 	{ name: "Projects", href: "/projects" },
// 	{ name: "Profile", href: "/profile" },
// ];

// const navLinksOrganizer = [
// 	{ name: "Dashboard", href: "/dashboard" },
// 	{ name: "Post Project", href: "/post" },
// 	{ name: "Stats", href: "/stats" },
// 	{ name: "Volunteers", href: "/volunteers" },
// 	{ name: "Profile", href: "/profile" },
// ];

// { role = "volunteer" }
const Navbar = () => {
	// const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { refetchUser } = useAuth();
	// const navLinks =
	// 	role === "organizer" ? navLinksOrganizer : navLinksVolunteer;

	const handleLogout = async () => {
		try {
			await logout();

			// clear any local state, cache or reset auth context
			refetchUser(); // optional: to force user state reset

			toast.success("Logged out successfully!");

			// Ensure it navigates after toast and cleanup
			setTimeout(() => {
				navigate("/login/user");
			}, 100);
		} catch (err) {
			console.error(err);
			toast.error("Failed to logout");
		}
	};

	return (
		<nav className='w-full bg-white border-b '>
			<div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
				<div className='text-lg font-semibold'>
					<div className='flex items-center gap-x-2'>
						<img
							src={RaiseHandLogo}
							alt='logo'
							className='h-6 w-6'
						/>
						<h3 className='text-2xl font-semibold tracking-wide'>
							Raise Hand
						</h3>
					</div>
				</div>

				<Button
					onClick={handleLogout}
					size='icon'
					variant='default'
				>
					<LogOut className='h-4 w-4' />
				</Button>

				{/* Desktop Nav */}
				{/* <div className='hidden md:flex gap-6'>
					{navLinks.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className='text-gray-700 hover:text-black transition text-sm'
						>
							{link.name}
						</a>
					))}
				</div> */}

				{/* Hamburger Menu */}
				{/* <div className='md:hidden'>
					<button onClick={() => setOpen(!open)}>
						{open ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</button>
				</div> */}
			</div>

			{/* Mobile Nav */}
			{/* <div
				className={cn(
					"md:hidden transition-all duration-300 ease-in-out overflow-hidden",
					open ? "max-h-96 px-4 pb-4" : "max-h-0 px-4"
				)}
			>
				<div className='flex flex-col gap-4'>
					{navLinks.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className='text-gray-700 hover:text-black text-sm'
							onClick={() => setOpen(false)}
						>
							{link.name}
						</a>
					))}
				</div>
			</div> */}
		</nav>
	);
};

export default Navbar;
