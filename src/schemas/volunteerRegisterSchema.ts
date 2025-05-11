import { z } from "zod";

export const VolunteerSchema = z
	.object({
		firstName: z
			.string()
			.min(2, { message: "First name must be at least 2 characters" })
			.max(30, { message: "First name cannot exceed 30 characters" })
			.regex(/^[A-Za-z]+$/, {
				message: "First name must contain only letters",
			})
			.nonempty({ message: "First name is required" }),

		surname: z
			.string()
			.min(2, { message: "Surname must be at least 2 characters" })
			.max(30, { message: "Surname cannot exceed 30 characters" })
			.regex(/^[A-Za-z]+$/, {
				message: "Surname must contain only letters",
			})
			.nonempty({ message: "Surname is required" }),

		userName: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" })
			.max(20, { message: "Username cannot exceed 20 characters" })
			.regex(/^[a-zA-Z0-9_]+$/, {
				message:
					"Username can only contain letters, numbers, and underscores",
			})
			.nonempty({ message: "Username is required" }),

		email: z
			.string()
			.email({ message: "Invalid email format" })
			.nonempty({ message: "Email is required" }),

		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, {
				message: "Password must contain at least one number",
			})
			.regex(/[\W_]/, {
				message: "Password must contain at least one special character",
			})
			.nonempty({ message: "Password is required" }),

		confirmPassword: z
			.string()
			.nonempty({ message: "Confirm Password is required" }),

		state: z
			.string()
			.min(1, { message: "State is required" })
			.refine((value) => value !== "Select a State", {
				message: "Please select a valid state",
			}),

		city: z
			.string()
			.min(1, { message: "City is required" })
			.refine((value) => value !== "Select a City", {
				message: "Please select a valid city",
			}),
		locality: z.string().min(2, { message: "Locality is required" }),

		// willing_to_work_in_other_domains: z.boolean().default(false),
		willing_to_work_in_other_domains: z.boolean({
			required_error:
				"Please select if you are willing to work in other domains",
			invalid_type_error: "Please select a valid option",
		}),

		availability: z
			.string()
			.refine(
				(val) =>
					["full-time", "part-time", "weekends", "flexible"].includes(
						val.toLowerCase()
					),
				{
					message:
						"Availability must be one of: full-time, part-time, weekends, flexible",
				}
			),

		// profile_picture: z
		// 	.string()
		// 	.url({ message: "Invalid profile picture URL" })
		// 	.nonempty({ message: "Profile picture is required" }),
		
		selected_domains: z
			.array(z.string().uuid({ message: "Invalid domain UUID" }))
			.nonempty({ message: "Please select at least one domain" }),

		selected_subdomains: z
			.array(z.string().uuid({ message: "Invalid subdomain UUID" }))
			.nonempty({ message: "At least one subdomain is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
