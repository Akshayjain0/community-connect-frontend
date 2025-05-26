import { CreateProjectPayload } from "@/types/projects/CreateProject";
import axiosInstance from "../axios";

export const createProject = async (payload: CreateProjectPayload) => {
	return axiosInstance.post("/projects", payload);
};

export const getMyPost = async () => {
	return axiosInstance.get("/projects/my-projects");
};

export const getMyFeed = async () => {
	return axiosInstance.get("/projects/feed");
};
