/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { registerOrganizer } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";
import { OrganizerSchema } from "@/schemas/organizerRegisterSchema";

export function useOrganizerRegistration() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate(); // for redirection

	async function onSubmit(values: z.infer<typeof OrganizerSchema>) {
		setLoading(true);

		// Step 2: Combine firstName and surname
		const organizer_name = `${values.firstName.trim()} ${values.surname.trim()}`;

		// Step 3: Prepare final payload
		const {
			firstName, // remove from rest
			surname, // remove from rest
			...rest
		} = values;

		const finalPayload = {
			...rest,
			organizer_name,
		};

		// Step 4: API call
		try {
			await registerOrganizer(finalPayload);
			toast.success("Registration Successful", {
				description: "You’ve been registered as a organizer!",
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
