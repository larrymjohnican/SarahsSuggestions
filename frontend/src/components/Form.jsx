import { useState } from "react"; // React hook to manage state
import api from "../api"; // Import API client
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; // Import constants for token storage
import "../styles/Form.css" // Import CSS styles
import LoadingIndicator from "./LoadingIndicator"; // Import loading indicator component

// Define the Form component
function Form({ route, method }) {
    // State variables
    const [username, setUsername] = useState(""); // Store username
    const [password, setPassword] = useState(""); // Store password
    const [loading, setLoading] = useState(false); // Store loading state
    const navigate = useNavigate(); // React Router hook for navigation

    // Determine the name based on the form method (login or register)
    const name = method === "login" ? "Login" : "Register";

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true); // Set loading state to true
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send API request with username and password
            const res = await api.post(route, { username, password })

            // Handle response based on the form method
            if (method === "login") {
                // If login, store access and refresh tokens in localStorage
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/") // Navigate to the home page
            } else {
                navigate("/login") // Navigate to the login page
            }
        } catch (error) {
            alert(error) // Display error message
        } finally {
            setLoading(false) // Set loading state to false
        }
    };

    // Render the form
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1> {/* Display form name (Login or Register) */}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                placeholder="Password"
            />
            {loading && <LoadingIndicator />} {/* Show loading indicator if loading */}
            <button className="form-button" type="submit">
                {name} {/* Display form name (Login or Register) */}
            </button>
        </form>
    );
}

export default Form