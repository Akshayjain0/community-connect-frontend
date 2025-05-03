import  { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RaiseHandLogo from "/images/RaiseHand.webp";

const navLinksVolunteer = [
	{ name: "Home", href: "/" },
	{ name: "Feed", href: "/feed" },
	{ name: "Stats", href: "/stats" },
	{ name: "Projects", href: "/projects" },
	{ name: "Profile", href: "/profile" },
];

const navLinksOrganizer = [
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Post Project", href: "/post" },
	{ name: "Stats", href: "/stats" },
	{ name: "Volunteers", href: "/volunteers" },
	{ name: "Profile", href: "/profile" },
];

const Navbar = ({ role = "volunteer" }) => {
	const [open, setOpen] = useState(false);
	const navLinks =
		role === "organizer" ? navLinksOrganizer : navLinksVolunteer;

	return (
		<nav className='w-full bg-white border-b border-gray-150'>
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

				{/* Desktop Nav */}
				<div className='hidden md:flex gap-6'>
					{navLinks.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className='text-gray-700 hover:text-black transition text-sm'
						>
							{link.name}
						</a>
					))}
				</div>

				{/* Hamburger Menu */}
				<div className='md:hidden'>
					<button onClick={() => setOpen(!open)}>
						{open ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			<div
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
			</div>
		</nav>
	);
};

export default Navbar;
