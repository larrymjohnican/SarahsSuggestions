import { useState } from "react"; // React hook to manage state
import api from "../api"; // Import API client
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; // Import constants for token storage
import "../styles/Form.css" // Import CSS styles
import LoadingIndicator from "./LoadingIndicator"; // Import loading indicator component

"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="flex flex-col max-w-sm w-full">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email"/>
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            placeholder="name@flowbite.com"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password"/>
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember"/>
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoadingIndicator/> : "Submit"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default Form