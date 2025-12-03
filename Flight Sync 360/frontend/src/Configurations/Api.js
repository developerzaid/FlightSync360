import axios from "axios";

// Create Axios instance
const api = axios.create({
	baseURL: "http://localhost:8080/", // your backend URL
});

// Request interceptor to attach JWT and company ID
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("jwt");
		const companyId = localStorage.getItem("companyId");

		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		if (companyId) {
			config.headers["X-Company-Id"] = companyId;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
	(response) => response, // pass through successful responses
	async (error) => {
		if (!error.response) {
			// Network error
			console.error("Network error:", error);
			return Promise.reject(error);
		}

		const { status } = error.response;

		if (status === 401) {
			// Token expired or unauthorized
			console.warn("Unauthorized! Redirecting to login...");
			localStorage.removeItem("jwt");
			// Optional: redirect to login page
			window.location.href = "/login";
		}

		if (status === 403) {
			// Forbidden
			alert("You do not have permission to perform this action.");
		}

		// You can handle other statuses here (400, 500, etc.)

		return Promise.reject(error);
	}
);

export default api;
