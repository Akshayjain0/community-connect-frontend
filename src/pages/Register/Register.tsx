import { Separator } from "../../components/ui/separator";
import RaiseHandLogo from "/images/RaiseHand.webp";
import RegisterVolunteer from "/images/register-volunteer.svg";
import RegisterOrganizer from "/images/register-organizer.svg";

import { BsArrowRight } from "react-icons/bs";
const Register = () => {
	return (
		<div className='flex flex-col items-center w-full my-12 gap-5'>
			<div className='flex flex-col'>
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
			<div className='w-[80%] my-3'>
				<Separator style={{ backgroundColor: "black" }} />
			</div>
			<div className='flex flex-col items-center my-10 gap-2'>
				<h2 className='text-4xl font-semibold '>Register!</h2>
				<h5 className='font-medium '>Who you are?</h5>
			</div>

			<div className='flex items-center gap-8'>
				<div className='w-96 h-80 rounded-2xl bg-[#C3EEFC] flex flex-col justify-between hover:outline-1 overflow-hidden cursor-pointer'>
					<div className='self-center mt-5 flex items-center gap-2'>
						<h5 className='text-3xl font-bold tracking-wide'>
							I'm a Organizer
						</h5>
						<BsArrowRight size={25} />
					</div>

					<img
						src={RegisterOrganizer}
						alt=''
						className='self-start h-56'
					/>
				</div>
				<div className='w-96 h-80 rounded-2xl bg-[#FDFE90] flex flex-col justify-between hover:outline-1 overflow-hidden cursor-pointer'>
					<div className='self-center mt-5 flex items-center gap-2'>
						<h5 className='text-3xl font-bold tracking-wide'>
							I'm a Volunteer
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

			<div>
				<h4 className='underline my-10 font-semibold text-lg cursor-pointer'>
					I already have account!
				</h4>
			</div>
			<div className='w-[80%] my-3'>
				<Separator style={{ backgroundColor: "black" }} />
			</div>
		</div>
	);
};

export default Register;
