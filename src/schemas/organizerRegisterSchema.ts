import { z } from "zod";

export const OrganizerSchema = z
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

		contact_number: z
			.string()
			.regex(/^[0-9]{10}$/, {
				message: "Contact number must be a valid 10-digit number",
			})
			.nonempty({ message: "Contact number is required" }),

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
			.nonempty({ message: "Confirm password is required" }),

		state: z.string().min(1, { message: "State is required" }),
		city: z.string().min(1, { message: "City is required" }),

		logo: z.string().url({ message: "Invalid logo URL" }).optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});
