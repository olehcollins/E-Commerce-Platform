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

apiClient.interceptors.request.use(
	async (config) => {
		if (localStorage.getItem("userInfo"))
			config.headers.authorization = `Bearer ${
				JSON.parse(localStorage.getItem("userInfo")!).refreshToken
			}`;
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default apiClient;
