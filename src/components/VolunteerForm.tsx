import { VolunteerSchema } from "@/schemas/volunteerRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import IndiaStateCitySelect from "./StateCitySelect";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

import { communityProjectDomains } from "@/Constants/communityProjectDomains";

const VolunteerForm = () => {
	const form = useForm<z.infer<typeof VolunteerSchema>>({
		resolver: zodResolver(VolunteerSchema),
		defaultValues: {
			firstName: "",
			surname: "",
			userName: "",
			email: "",
			password: "",
			state: "",
			city: "",
			confirmPassword: "",
			preferred_domains: [],
			willing_to_work_in_other_domains: false, // Boolean field
			availability: "full-time", // Set a default valid value
			profile_picture: "",
		},
	});

	function onSubmit(values: z.infer<typeof VolunteerSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
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
									{" "}
									{/* 50% width */}
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
									{" "}
									{/* 50% width */}
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
								{" "}
								{/* 50% width */}
								<FormLabel>User Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Akshay Jain'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='w-full'>
								{" "}
								{/* 50% width */}
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='akshay@gmail.com'
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
									{" "}
									{/* 50% width */}
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='••••••••••'
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
									{" "}
									{/* 50% width */}
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											placeholder='••••••••••'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<IndiaStateCitySelect form={form} />

					<FormField
						control={form.control}
						name='preferred_domains'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Preferred Volunteer Domains
								</FormLabel>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select preferred domains' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{communityProjectDomains.map(
											(domain) => (
												<SelectItem
													key={domain.value}
													value={domain.value}
												>
													{domain.label}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex items-center justify-between w-full gap-4'>
						<div className='w-1/2'>
							<FormField
								control={form.control}
								name='availability'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Availability</FormLabel>
										<Select
											onValueChange={field.onChange}
											// defaultValue={field.value}
										>
											<FormControl className='w-full'>
												<SelectTrigger>
													<SelectValue placeholder='Select your availability' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='full-time'>
													Full Time
												</SelectItem>
												<SelectItem value='part-time'>
													Part Time
												</SelectItem>
												<SelectItem value='weekends'>
													Weekends
												</SelectItem>
												<SelectItem value='flexible'>
													Flexible
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='w-1/2'>
							<FormField
								control={form.control}
								name='willing_to_work_in_other_domains'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Willing To Work In Other Domains
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											// defaultValue={"false"}
										>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select your interest' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={"true"}>
													Yes
												</SelectItem>
												<SelectItem value='false'>
													No
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button
						type='submit'
						className='w-full h-10 mt-2 '
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default VolunteerForm;
