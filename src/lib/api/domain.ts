import axiosInstance from "../axios";

export const getDomainList = async () => {
	return axiosInstance.get("/domains");
};
