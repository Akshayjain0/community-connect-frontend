import axiosInstance from "@/lib/axios";
import {
	OrganizerLogin,
	OrganizerRegistration,
} from "@/types/organizer/OrganizerTypes";
import {
	VolunteerLogin,
	VolunteerRegistration,
} from "@/types/volunteer/VolunteerTypes";

// Volunteer Auth API's

export const registerVolunteer = async (payload: VolunteerRegistration) => {
	return axiosInstance.post("/auth/volunteerRegister", payload);
};

export const loginVolunteer = async ({
	usernameOrEmail,
	password,
}: VolunteerLogin) => {
	const isEmail = usernameOrEmail.includes("@");
	const payload = isEmail
		? { email: usernameOrEmail, password }
		: { userName: usernameOrEmail, password };

	return axiosInstance.post("/auth/volunteerLogin", payload);
};

// Organizer Auth API's

export const registerOrganizer = async (payload: OrganizerRegistration) => {
	return axiosInstance.post("/auth/organizerRegister", payload);
};

export const loginOrganizer = async ({
	usernameOrEmail,
	password,
}: OrganizerLogin) => {
	const isEmail = usernameOrEmail.includes("@");
	const payload = isEmail
		? { email: usernameOrEmail, password }
		: { userName: usernameOrEmail, password };

	return axiosInstance.post("/auth/organizerLogin", payload);
};

export const logout = async () => {
	return axiosInstance.post("/auth/logout");
};

export const getMe = async () => {
	return axiosInstance.get("/auth/me");
};
