import { OrganizerSchema } from "@/schemas/organizerRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import IndiaStateCitySelect from "./StateCitySelect";

const OrganizerForm = () => {
	const form = useForm<z.infer<typeof OrganizerSchema>>({
		resolver: zodResolver(OrganizerSchema),
		defaultValues: {
			firstName: "",
			surname: "",
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
			contact_number: "",
			state: "",
			city: "",
			logo: "",
		},
	});

	function onSubmit(values: z.infer<typeof OrganizerSchema>) {
		console.log(values);
	}

	return (
		<div className='w-[100%] mt-10'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<div className='flex items-center justify-between w-full gap-4'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem className='w-1/2'>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder='John'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='surname'
							render={({ field }) => (
								<FormItem className='w-1/2'>
									<FormLabel>Surname</FormLabel>
									<FormControl>
										<Input
											placeholder='Doe'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='userName'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder='Organizer123'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='organizer@example.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='contact_number'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Contact Number</FormLabel>
								<FormControl>
									<Input
										placeholder='+91 9876543210'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex items-center justify-between w-full gap-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem className='w-1/2'>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='••••••••'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem className='w-1/2'>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='••••••••'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* State and City Select */}
					<IndiaStateCitySelect form={form} />

					<FormField
						control={form.control}
						name='logo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Organization Logo (URL)</FormLabel>
								<FormControl>
									<Input
										placeholder='https://example.com/logo.png'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='w-full h-10 mt-2'
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default OrganizerForm;
