import { useCallback, useEffect, useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

import { Plus } from "lucide-react";
import IndiaStateCitySelect from "./StateCitySelect";
import { Button } from "./ui/button";
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
	DomainListType,
	MultiSelectOption,
} from "@/types/volunteer/DomainListType";
import { toast } from "sonner";
import { createProject } from "@/lib/api/project";
import { CreateProjectPayload } from "@/types/projects/CreateProject";
import { getDomainList } from "@/lib/api/domain";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	state: z.string().min(1, "State is required"),
	city: z.string().min(1, "City is required"),
	locality: z.string().min(1, "Locality is required"),
	domain_id: z.string().uuid("Invalid domain"),
	subdomain_ids: z
		.array(z.string().uuid({ message: "Invalid subdomain UUID" }))
		.nonempty({ message: "At least one subdomain is required" }),
	time_commitment: z.string().min(1, "Time commitment is required"),
});
interface CreateProjectModalProps {
	onSuccess: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
	onSuccess,
}) => {
	const [domainList, setDomainList] = useState<DomainListType[]>([]);
	const [selectedDomain, setSelectedDomain] = useState<string>("");
	const [open, setOpen] = useState(false);

	console.log(onSuccess);

	const fetchDomainList = useCallback(async () => {
		try {
			const response = await getDomainList();
			setDomainList(response.data);
		} catch (err) {
			console.error("Error fetching domains:", err);
		}
	}, []);

	useEffect(() => {
		fetchDomainList();
	}, [fetchDomainList]);

	const selectedDomainObject = domainList.find(
		(domain) => domain._id === selectedDomain
	);

	const subdomainOptions: MultiSelectOption[] =
		selectedDomainObject?.subdomains.map((sub) => ({
			label: sub.sub_domain_name,
			value: sub._id,
		})) || [];

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			state: "",
			city: "",
			locality: "",
			domain_id: "",
			subdomain_ids: [],
			time_commitment: "",
		},
	});

	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: CreateProjectPayload) => {
		try {
			setLoading(true);

			// 🟡 Actually await project creation
			await toast.promise(createProject(data), {
				loading: "Creating project...",
				success: "Project created successfully!",
				error: (err) =>
					err?.response?.data?.message || "Failed to create project.",
			});

			// ✅ Allow backend to persist (for slow write ops or propagation delay)
			await new Promise((res) => setTimeout(res, 500));

			// ✅ Refetch updated projects
			await onSuccess();

			// ✅ Close modal AFTER data is fetched
			setOpen(false);
			form.reset();
		} catch (error) {
			console.error("Create project error:", error);
			toast.error("Something went wrong while creating project.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{" "}
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<Button>
						<span>
							<Plus />
						</span>{" "}
						New Project
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[600px]'>
					<DialogHeader>
						<DialogTitle className='text-2xl'>
							Create New Project
						</DialogTitle>
						<DialogDescription>
							Fill in the details to post a new project
							opportunity.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 mt-4'
						>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder='This is a title 2'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Need a volunteer for helping in this event 2'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<IndiaStateCitySelect form={form} />

							<FormField
								control={form.control}
								name='locality'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Locality</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Nagala bari narayan nagar, near jain mandir'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='domain_id'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Choose Your Domain
										</FormLabel>
										<FormControl className='w-full'>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setSelectedDomain(value);
												}}
												value={field.value}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select domain' />
												</SelectTrigger>
												<SelectContent className='w-full'>
													{domainList.map(
														(domain) => (
															<SelectItem
																key={domain._id}
																className='w-full hover:bg-gray-200 cursor-pointer'
																value={
																	domain._id
																}
															>
																{
																	domain.domain_name
																}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='subdomain_ids'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Choose Sub-Domain</FormLabel>
										<FormControl className='w-full'>
											<Select
												disabled={!selectedDomain}
												onValueChange={(value) =>
													field.onChange([value])
												}
												value={field.value[0] ?? ""}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select subdomain' />
												</SelectTrigger>
												<SelectContent>
													{subdomainOptions.map(
														(sub) => (
															<SelectItem
																key={sub.value}
																value={
																	sub.value
																}
															>
																{sub.label}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='time_commitment'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Time Commitment</FormLabel>
										<FormControl>
											<Input
												placeholder='Weekend'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button
									type='submit'
									disabled={loading}
								>
									{loading ? "Creating..." : "Create Project"}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateProjectModal;
