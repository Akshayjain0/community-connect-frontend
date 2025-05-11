export interface OrganizerRegistration {
	organizer_name: string;
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
	contact_number: string;
	state: string;
	city: string;
	locality: string;
}

export type OrganizerLogin = { usernameOrEmail: string; password: string };
