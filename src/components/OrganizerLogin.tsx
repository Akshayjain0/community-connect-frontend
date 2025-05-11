import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginOrganizer } from "@/lib/api/auth";
import { toast } from "sonner";
import { RoleBasedRedirect } from "@/types/RoleBasedRedirect";
import { useAuth } from "@/context/AuthContext";

// Define validation schema
const loginSchema = z.object({
	usernameOrEmail: z.string().min(1, "Username or Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type Props = {
	roleBasedRedirect: RoleBasedRedirect;
};
const OrganizerLogin: React.FC<Props> = ({ roleBasedRedirect }) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate(); // for redirection
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const { role, refetchUser } = useAuth();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			usernameOrEmail: "",
			password: "",
		},
	});

	useEffect(() => {
		if (shouldRedirect && role) {
			navigate(roleBasedRedirect[role]);
		}
	}, [shouldRedirect, role, navigate, roleBasedRedirect]);

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setLoading(true);
		try {
			await loginOrganizer(values);

			refetchUser();

			toast.success("Login Successful", {
				description: "Welcome back, Organizer!",
			});

			setShouldRedirect(true);
		} catch (error: any) {
			toast.error("Login Failed", {
				description:
					error?.response?.data?.message ||
					"An error occurred during registration.",
			});
		} finally {
			setLoading(false);
		}
		console.log("Login Data:", values);
		// Integrate with authentication API here
	}
	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col items-center gap-3'>
				<h3 className='text-5xl font-bold tracking-wide'>
					Welcome Back, Organizer!
				</h3>
				<p className='text-md font-medium text-center text-gray-500'>
					Access your dashboard to manage volunteer opportunities,
					connect with passionate individuals, and drive impact in
					your community.
				</p>
			</div>

			<div className='w-[65%] mt-10 '>
				{/* <h2 className='text-2xl font-semibold text-center'>
					Volunteer Login
				</h2> */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 mt-4'
					>
						{/* Username or Email */}
						<FormField
							control={form.control}
							name='usernameOrEmail'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username or Email</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your username or email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password */}
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Enter your password'
											{...field}
											className='h-10'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='text-right cursor-pointer'>
							<p className='underline text-red-500 text-xs'>
								Forgot Password
							</p>
						</div>

						{/* Submit Button */}
						<Button
							type='submit'
							className='w-full h-10'
							disabled={loading}
						>
							{loading ? "Submitting..." : "Submit"}
						</Button>
					</form>
				</Form>
			</div>
			<div className='text-center mt-3'>
				<p>OR</p>
				<Link to={"/register/user"}>
					<p className='underline cursor-pointer'>
						I don't have any account
					</p>
				</Link>
			</div>
		</div>
	);
};

export default OrganizerLogin;
