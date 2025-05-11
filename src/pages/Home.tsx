import { Link } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import RaiseHandLogo from "/images/RaiseHand.webp";
import AlreadyHaveAccount from "/images/home-login.svg";
import DontHaveAccount from "/images/home-register.svg";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
	return (
		<div className='flex flex-col items-center w-full my-12 gap-8'>
			<div className='flex flex-col'>
				<div className='flex items-center gap-x-2'>
					<img
						src={RaiseHandLogo}
						alt='logo'
						className='h-6 w-6'
					/>
					<h3 className='text-2xl font-semibold'>Raise Hand</h3>
				</div>
			</div>
			<div className='w-[80%] my-3'>
				<Separator style={{ backgroundColor: "black" }} />
			</div>
			<div className='flex flex-col items-center'>
				<h2 className='text-4xl font-semibold'>Hello!</h2>
				<h5 className='font-medium'>
					Welcome to Community Connect Platform
				</h5>
			</div>
			<div className='w-[55%] flex flex-col gap-10'>
				<Link to={"/login/user"}>
					<div className='h-52 w-full border rounded-2xl border-gray-300 flex justify-around gap-5 items-center hover:outline-1 hover:bg-green-50 cursor-pointer'>
						<div className='flex items-center gap-4'>
							<h5 className='text-3xl font-medium'>
								I have already an account
							</h5>
							<BsArrowRight size={30} />
						</div>

						<img
							src={AlreadyHaveAccount}
							alt='Already have account'
							className='mt-1'
						/>
					</div>
				</Link>

				<Link to={"/register/user"}>
					<div className='h-52 w-full border rounded-2xl border-gray-300 flex justify-around gap-5 items-center hover:outline-1 hover:bg-green-50 cursor-pointer'>
						<div className='flex items-center gap-4'>
							<h5 className='text-3xl font-medium'>
								I don't have an account
							</h5>
							<BsArrowRight size={30} />
						</div>

						<img
							src={DontHaveAccount}
							alt='Already have account'
							className='mt-3'
						/>
					</div>
				</Link>
			</div>
			<div className='w-[80%] my-8'>
				<Separator style={{ backgroundColor: "black" }} />
			</div>
		</div>
	);
};

export default Home;
