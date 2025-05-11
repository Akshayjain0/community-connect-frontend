export interface VolunteerRegistration {
	fullName: string;
	userName: string;
	email: string;
	password: string;
	state: string;
	city: string;
	locality: string;
	confirmPassword: string;
	interested_domains: {
		domain_id: string; // just a single string
		subdomain_ids: string[];
	}[];
	willing_to_work_in_other_domains: boolean; // Boolean field
	availability: string; // Set a default valid value
	// profile_picture: "",
}

export type VolunteerLogin = { usernameOrEmail: string; password: string };
