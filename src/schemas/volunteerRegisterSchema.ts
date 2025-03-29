// import { z } from "zod";
// export const VolunteerSchema = z.object({
// 	firstName: z
// 		.string()
// 		.min(2, { message: "First name must be at least 2 characters" })
// 		.max(30, { message: "First name cannot exceed 30 characters" })
// 		.regex(/^[A-Za-z]+$/, {
// 			message: "First name must contain only letters",
// 		})
// 		.nonempty({ message: "First name is required" }), // Explicitly required

import { z } from "zod";

// 	surname: z
// 		.string()
// 		.min(2, { message: "Surname must be at least 2 characters" })
// 		.max(30, { message: "Surname cannot exceed 30 characters" })
// 		.regex(/^[A-Za-z]+$/, { message: "Surname must contain only letters" })
// 		.nonempty({ message: "Surname is required" }),

// 	userName: z
// 		.string()
// 		.min(3, { message: "Username must be at least 3 characters" })
// 		.max(20, { message: "Username cannot exceed 20 characters" })
// 		.regex(/^[a-zA-Z0-9_]+$/, {
// 			message:
// 				"Username can only contain letters, numbers, and underscores",
// 		})
// 		.nonempty({ message: "Username is required" }),

// 	email: z
// 		.string()
// 		.email({ message: "Invalid email format" })
// 		.nonempty({ message: "Email is required" }),

// 	password: z
// 		.string()
// 		.min(8, { message: "Password must be at least 8 characters" })
// 		.regex(/[A-Z]/, {
// 			message: "Password must contain at least one uppercase letter",
// 		})
// 		.regex(/[a-z]/, {
// 			message: "Password must contain at least one lowercase letter",
// 		})
// 		.regex(/[0-9]/, {
// 			message: "Password must contain at least one number",
// 		})
// 		.regex(/[\W_]/, {
// 			message: "Password must contain at least one special character",
// 		})
// 		.nonempty({ message: "Password is required" }),
// 	state: z.string().min(1, "State is required"), // Ensuring state is selected
// 	city: z.string().min(1, "City is required"), // Ensuring city is selected

// 	willing_to_work_in_other_domains: z.boolean().default(false),

// 	availability: z
// 		.string()
// 		.refine(
// 			(val) =>
// 				["full-time", "part-time", "weekends", "flexible"].includes(
// 					val.toLowerCase()
// 				),
// 			{
// 				message:
// 					"Availability must be one of: full-time, part-time, weekends, flexible",
// 			}
// 		),
// 	profile_picture: z
// 		.string()
// 		.url({ message: "Invalid profile picture URL" })
// 		.nonempty({ message: "Profile picture is required" }),
// });

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

		willing_to_work_in_other_domains: z.boolean().default(false),

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

		profile_picture: z
			.string()
			.url({ message: "Invalid profile picture URL" })
			.nonempty({ message: "Profile picture is required" }),

		preferred_domains: z
			.array(
				z
					.string()
					.refine(
						(val) =>
							[
								"education_tutoring",
								"healthcare_support",
								"environmental_conservation",
								"animal_welfare",
								"event_organization",
								"disaster_relief",
								"elderly_care",
								"fundraising_donations",
								"skill_development",
								"women_child_welfare",
								"lgbtq_support",
								"mental_health",
								"community_gardening",
								"technology_digital_literacy",
								"homeless_support",
								"legal_aid",
								"cultural_arts",
								"sports_recreational",
								"youth_empowerment",
								"social_media_awareness",
							].includes(val),
						{
							message: "Invalid selection",
						}
					)
			)
			.nonempty({ message: "Please select at least one domain" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
