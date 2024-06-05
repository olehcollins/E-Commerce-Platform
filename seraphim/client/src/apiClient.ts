import axios from "axios";

const baseURL =
	import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_API_BASE_URL : "/";

const apiClient = axios.create({
	baseURL,
	headers: {
		"Content-type": "application/json",
	},
	// withCredentials: true,
});

export default apiClient;
