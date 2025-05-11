/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { DomainListType } from "@/types/volunteer/DomainListType";
import { VolunteerSchema } from "@/schemas/volunteerRegisterSchema";
import { registerVolunteer } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";

export function useVolunteerRegistration(domainList: DomainListType[]) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate(); // for redirection

	async function onSubmit(values: z.infer<typeof VolunteerSchema>) {
		setLoading(true);

		// Step 1: Build interested_domains payload
		const preferredDomainsPayload = values.selected_domains.map(
			(domainId) => {
				const domain = domainList.find((d) => d._id === domainId);
				const subdomainIds =
					domain?.subdomains
						.filter((sub) =>
							values.selected_subdomains.includes(sub._id)
						)
						.map((sub) => sub._id) || [];

				return {
					domain_id: domainId,
					subdomain_ids: subdomainIds,
				};
			}
		);

		// Step 2: Combine firstName and surname
		const fullName = `${values.firstName.trim()} ${values.surname.trim()}`;

		// Step 3: Prepare final payload
		const {
			firstName, // remove from rest
			surname, // remove from rest
			selected_domains,
			selected_subdomains,
			...rest
		} = values;

		const finalPayload = {
			...rest,
			fullName,
			interested_domains: preferredDomainsPayload,
		};

		// Step 4: API call
		try {
			await registerVolunteer(finalPayload);
			toast.success("Registration Successful", {
				description: "You’ve been registered as a volunteer!",
			});
			navigate("/dashboard"); // ✅ Redirect to dashboard
		} catch (error: any) {
			toast.error("Registration Failed", {
				description:
					error?.response?.data?.message ||
					"An error occurred during registration.",
			});
		} finally {
			setLoading(false);
		}
	}

	return { onSubmit, loading };
}
