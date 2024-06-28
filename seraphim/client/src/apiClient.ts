import axios from "axios";

const baseURL =
	import.meta.env.VITE_NODE_ENV === "production"
		? import.meta.env.VITE_API_BASE_URL
		: "http://localhost:4000";
// const baseURL = "https://lit-mountain-17642-0035c22f4149.herokuapp.com";

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
