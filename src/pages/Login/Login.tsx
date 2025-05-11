import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import RegisterVolunteer from "/images/register-volunteer.svg";
import RegisterOrganizer from "/images/register-organizer.svg";
import RaiseHandLogo from "/images/RaiseHand.webp";
import VolunteerLogin from "../../components/VolunteerLogin";
import OrganizerLogin from "../../components/OrganizerLogin";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Login = () => {
	const [selectedRole, setSelectedRole] = useState<"volunteer" | "organizer">(
		"volunteer"
	);

	const roleBasedRedirect: Record<"volunteer" | "organizer", string> = {
		volunteer: "/volunteer/dashboard",
		organizer: "/organizer/dashboard",
	};

	return (
		<div className='flex h-screen w-full'>
			{/* Left Component */}
			<div className='w-[30%] bg-white h-full flex flex-col justify-evenly items-center overflow-hidden border border-t-0 border-b-0 border-l'>
				{/* Organizer Card */}
				<h2 className='text-2xl font-semibold'>Login as a</h2>
				<div
					className={`w-96 h-80 rounded-2xl bg-[#C3EEFC] flex flex-col justify-between overflow-hidden cursor-pointer transition-all ${
						selectedRole === "organizer"
							? " outline-2 outline-black shadow-xl"
							: " hover:outline-1"
					}`}
					onClick={() => setSelectedRole("organizer")}
				>
					<div className='self-center mt-5 flex items-center gap-2'>
						<h5 className='text-3xl font-bold tracking-wide'>
							Organizer
						</h5>
						<BsArrowRight size={25} />
					</div>
					<img
						src={RegisterOrganizer}
						alt=''
						className='self-start h-56'
					/>
				</div>

				<div className='w-[90%] flex items-center gap-2 my-4'>
					<Separator className='flex-1 bg-gray-300' />
					<p className='font-semibold text-gray-600'>OR</p>
					<Separator className='flex-1 bg-gray-300' />
				</div>

				{/* Volunteer Card */}
				<div
					className={`w-96 h-80 rounded-2xl bg-[#FDFE90] flex flex-col justify-between overflow-hidden cursor-pointer transition-all ${
						selectedRole === "volunteer"
							? "outline-2 outline-black shadow-xl"
							: " hover:outline-1"
					}`}
					onClick={() => setSelectedRole("volunteer")}
				>
					<div className='self-center mt-5 flex items-center gap-2'>
						<h5 className='text-3xl font-bold tracking-wide'>
							Volunteer
						</h5>
						<BsArrowRight size={25} />
					</div>
					<img
						src={RegisterVolunteer}
						alt=''
						className='h-56 self-end'
					/>
				</div>
			</div>

			{/* Right Component */}
			<div className='w-[70%] flex items-center flex-col overflow-scroll mb-10'>
				<Link to={"/"}>
					<div className='flex flex-col my-10 cursor-pointer'>
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
				</Link>

				<div className='flex flex-col w-[60%] h-full '>
					{/* Conditional Rendering Based on Selection */}
					{selectedRole === "volunteer" ? (
						<VolunteerLogin roleBasedRedirect={roleBasedRedirect} />
					) : (
						<OrganizerLogin roleBasedRedirect={roleBasedRedirect} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
