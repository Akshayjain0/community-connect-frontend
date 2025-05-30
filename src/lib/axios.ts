import axios from "axios";

const axiosInstance = axios.create({
	baseURL:
		import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
	withCredentials: true, // Automatically send cookies
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
