import { BsArrowRight } from "react-icons/bs";
import RegisterVolunteerImage from "/images/register-volunteer.svg";
import RaiseHandLogo from "/images/RaiseHand.webp";
import VolunteerForm from "@/components/VolunteerForm";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getDomainList } from "@/lib/api/domain";
// import { Button } from "@/components/ui/button";


const RegisterVolunteer = () => {
	const [domain, setDomain] = useState([]);

	const fetchDomainList = useCallback(async () => {
		try {
			const response = await getDomainList();
			// console.log("Fetched domains:", response.data); // ✅ correct place
			setDomain(response.data);
		} catch (err) {
			console.error("Error fetching domains:", err);
		}
	}, []);

	useEffect(() => {
		fetchDomainList();
	}, [fetchDomainList]);

	return (
		<div className='flex h-screen w-full'>
			{/* Left Component */}
			<div className='w-[30%] bg-[#FDFE90] h-full flex flex-col justify-between items-center overflow-hidden'>
				<div className='flex items-center justify-center flex-1 gap-2'>
					<h4 className='font-semibold text-5xl'>I am a Volunteer</h4>
					<BsArrowRight
						size={30}
						className='mt-1'
					/>
				</div>
				<div className='self-end'>
					<img
						src={RegisterVolunteerImage}
						alt=''
						className='w-72'
					/>
				</div>
			</div>
			{/* Right Component */}
			<div className='w-[70%] flex items-center flex-col overflow-scroll mb-3'>
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
					<div className='flex flex-col items-center gap-1'>
						<h3 className='text-5xl font-bold tracking-wide'>
							Provide Some Information
						</h3>
						<p className='text-xl font-semibold text-gray-500'>
							This information will be usable for organizers
						</p>
					</div>

					{/* Centering this section */}
					<div className='h-full w-full flex flex-col  items-center '>
						<div className='w-full max-w-lg h-[60%]'>
							<VolunteerForm domainList={domain} />
						</div>

						{/* <div className='flex items-center justify-between w-full max-w-lg mt-6'>
							<Button
								className='flex font-semibold text-md'
								size={"lg"}
							>
								<BsArrowLeft
									size={30}
									strokeWidth={1}
									className='mt-1 '
								/>
								Back
							</Button>
							<Button
								className='flex font-semibold text-md'
								size={"lg"}
							>
								Next
								<BsArrowRight
									size={30}
									strokeWidth={1}
									className='mt-1 '
								/>
							</Button>
						</div> */}
					</div>
				</div>
			</div>
		</div>
		// <div className='flex h-screen w-full overflow-hidden'>
		// 	{/* Left Component */}
		// 	<div className='w-[30%] h-screen bg-[#FDFE90] flex flex-col justify-between items-center overflow-hidden'>
		// 		<div className='flex items-center justify-center flex-1 gap-2'>
		// 			<h4 className='font-semibold text-5xl'>I am a Volunteer</h4>
		// 			<BsArrowRight
		// 				size={30}
		// 				className='mt-1'
		// 			/>
		// 		</div>
		// 		<div className='self-end'>
		// 			<img
		// 				src={RegisterVolunteerImage}
		// 				alt=''
		// 				className='w-72'
		// 			/>
		// 		</div>
		// 	</div>

		// 	{/* Right Component */}
		// 	<div className='w-[70%] h-screen overflow-y-auto px-4'>
		// 		<Link to='/'>
		// 			<div className='flex flex-col my-10 cursor-pointer items-center'>
		// 				<div className='flex items-center gap-x-2'>
		// 					<img
		// 						src={RaiseHandLogo}
		// 						alt='logo'
		// 						className='h-6 w-6'
		// 					/>
		// 					<h3 className='text-2xl font-semibold tracking-wide'>
		// 						Raise Hand
		// 					</h3>
		// 				</div>
		// 			</div>
		// 		</Link>

		// 		<div className='flex flex-col w-full h-full items-center'>
		// 			<div className='flex flex-col items-center gap-1'>
		// 				<h3 className='text-5xl font-bold tracking-wide'>
		// 					Provide Some Information
		// 				</h3>
		// 				<p className='text-xl font-semibold text-gray-500'>
		// 					This information will be usable for organizers
		// 				</p>
		// 			</div>

		// 			<div className='w-full max-w-lg h-fit mt-10'>
		// 				<VolunteerForm domainList={domain} />
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default RegisterVolunteer;
