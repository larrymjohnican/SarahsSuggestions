// Import necessary libraries and components
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Import custom page components
import BookSuggestions from "./pages/BookSuggestions";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Component to handle user logout
function Logout() {
    // Clear local storage to remove user data
    localStorage.clear();
    // Redirect to the login page
    return <Navigate to="/login" />;
}

// Component to handle user registration and logout
function RegisterAndLogout() {
    // Clear local storage to remove user data
    localStorage.clear();
    // Render the Register component
    return <Register />;
}

// Main application component
function App() {
    return (
        <>
            {/* Define the application's routes */}
            <Routes>
                {/* Protected route for the home page, only accessible to authenticated users */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                {/* Public route for the landing page */}
                <Route path="/landing" element={<Landing />} />
                {/* Public route for the login page */}
                <Route path="/login" element={<Login />} />
                {/* Route for logout, clears local storage and redirects to login */}
                <Route path="/logout" element={<Logout />} />
                {/* Route for register, clears local storage before showing register form */}
                <Route path="/register" element={<RegisterAndLogout />} />
                {/* Public route for book suggestions */}
                <Route path="/suggestions" element={<BookSuggestions />} />
                {/* Catch-all route for undefined routes, shows the NotFound page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

// Export the App component as the default export
export default App;
