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
import { useState } from "react";
import { MultiSelect } from "./custom/MultiSelect";
import {
	DomainListType,
	MultiSelectOption,
} from "@/types/volunteer/DomainListType";
import { Textarea } from "./ui/textarea";
import { useVolunteerRegistration } from "@/hooks/useVolunteerRegistration";

const VolunteerForm = ({ domainList }: { domainList: DomainListType[] }) => {
	const { onSubmit, loading } = useVolunteerRegistration(domainList);
	// const [selectedSubdomains, setSelectedSubdomains] = useState<string[]>([]);
	const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
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
			locality: "",
			confirmPassword: "",
			// interested_domains: [],
			selected_domains: [],
			selected_subdomains: [],
			willing_to_work_in_other_domains: undefined, // Boolean field
			availability: "", // Set a default valid value
			// profile_picture: "",
		},
	});

	const domainOptions: MultiSelectOption[] = domainList.map((domain) => ({
		label: domain.domain_name,
		value: domain._id,
		group: "All Domains",
	}));

	const selectedDomainObjects = domainList.filter((domain) =>
		selectedDomains.includes(domain._id)
	);

	const subdomainOptions: MultiSelectOption[] = selectedDomainObjects.flatMap(
		(domain) =>
			domain.subdomains.map((sub) => ({
				label: sub.sub_domain_name,
				value: sub._id,
				group: domain.domain_name,
			}))
	);

	// Submit Function
	// async function onSubmit(values: z.infer<typeof VolunteerSchema>) {
	// 	console.log("hello");

	// 	const preferredDomainsPayload = values.selected_domains.map(
	// 		(domainId) => {
	// 			const domain = domainList.find((d) => d._id === domainId);
	// 			const subdomainIds =
	// 				domain?.subdomains
	// 					.filter((sub) =>
	// 						values.selected_subdomains.includes(sub._id)
	// 					)
	// 					.map((sub) => sub._id) || [];

	// 			return {
	// 				domain_id: domainId,
	// 				subdomain_ids: subdomainIds,
	// 			};
	// 		}
	// 	);

	// 	// Destructure to remove selected_domains and selected_subdomains
	// 	const { selected_domains, selected_subdomains, ...rest } = values;

	// 	const finalPayload = {
	// 		...rest,
	// 		interested_domains: preferredDomainsPayload,
	// 	};
	// 	console.log("Final Payload", finalPayload);
	// 	toast.success("Event has been created.");
	// 	try {
	// 		const response = await registerVolunteer(finalPayload);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

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
											type='password'
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
											type='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<IndiaStateCitySelect form={form} />
					<div className=''>
						<FormField
							control={form.control}
							name='locality'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Locality</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Street No. 1, Near ...'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='selected_domains'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Choose Your Domain</FormLabel>
								<FormControl>
									<MultiSelect
										options={domainOptions}
										value={field.value} // ✅ controlled by react-hook-form
										onValueChange={(value) => {
											field.onChange(value); // ✅ update form state
											setSelectedDomains(value); // ✅ update local state for subdomain calc
										}}
										placeholder='Select domains'
										variant='inverted'
										animation={2}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{selectedDomains.length > 0 && (
						<FormField
							control={form.control}
							name='selected_subdomains'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Choose Sub-Domain</FormLabel>
									<FormControl>
										<MultiSelect
											options={subdomainOptions}
											value={field.value} // ✅ controlled by react-hook-form
											onValueChange={(value) => {
												field.onChange(value); // ✅ update form state
												// setSelectedSubdomains(value); // ✅ sync local state
											}}
											placeholder='Select subdomains'
											variant='inverted'
											animation={2}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					)}
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
								name='willing_to_work_in_other_domains'
								control={form.control}
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>
											Willing to Work in Other Domains?
										</FormLabel>
										<Select
											onValueChange={(val) =>
												field.onChange(val === "true")
											}
											value={
												typeof field.value === "boolean"
													? field.value.toString()
													: undefined
											}
										>
											<FormControl className='w-full'>
												<SelectTrigger>
													<SelectValue placeholder='Select your interest' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='true'>
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

					{/* <Button
						type='submit'
						className='w-full h-10 mt-2 '
					>
						Submit
					</Button> */}
					<Button
						type='submit'
						className='w-full h-10 mt-2 '
						disabled={loading}
					>
						{loading ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default VolunteerForm;
