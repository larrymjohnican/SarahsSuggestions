import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    // In production the API is on the same origin; set VITE_API_URL for local dev
    // (e.g. VITE_API_URL=http://localhost:8000 in frontend/.env.local)
    baseURL: import.meta.env.VITE_API_URL || "",
});

// Add a request interceptor to the axios instance
api.interceptors.request.use(
    (config) => {
        // Retrieve the access token from local storage
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        // If a token exists, set the Authorization header for the request
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Return the modified config
        return config;
    },
    (error) => {
        // Handle request errors by rejecting the promise with the error
        return Promise.reject(error);
    }
);

// Export the configured axios instance for use in other parts of the application
export default api;
