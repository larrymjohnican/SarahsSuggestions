// Import axios for making HTTP requests
import axios from "axios";

// Import the ACCESS_TOKEN constant from the constants file
import { ACCESS_TOKEN } from "./constants";

// Default API URL if environment variable is not set
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

// Create an instance of axios with a custom configuration
const api = axios.create({
    // Set the base URL for the axios instance, using an environment variable if available, otherwise fallback to the default apiUrl
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
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
