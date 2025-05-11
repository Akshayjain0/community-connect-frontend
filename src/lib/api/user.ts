import axios from "@/lib/axios";

export const getUserProfile = async () => {
	return axios.get("/user/profile");
};

export const updateUser = async (data: Record<string, never>) => {
	return axios.put("/user/update", data);
};
