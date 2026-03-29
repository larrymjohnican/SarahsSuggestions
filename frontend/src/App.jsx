// Import necessary libraries and components
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Import custom page components
import BookSuggestions from "./pages/BookSuggestions";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Reviews from "./pages/Reviews";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Verify from "./pages/Verify";
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
                {/* Public landing page as homepage */}
                <Route path="/" element={<Landing />} />
                {/* Protected dashboard, only accessible to authenticated users */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                {/* Public route for the login page */}
                <Route path="/login" element={<Login />} />
                {/* Route for logout, clears local storage and redirects to login */}
                <Route path="/logout" element={<Logout />} />
                {/* Route for register, clears local storage before showing register form */}
                <Route path="/register" element={<RegisterAndLogout />} />
                {/* Public route for book reviews */}
                <Route path="/reviews" element={<Reviews />} />
                {/* Public route for book suggestions */}
                <Route path="/suggestions" element={<BookSuggestions />} />
                {/* Email verification route */}
                <Route path="/verify" element={<Verify />} />
                {/* Catch-all route for undefined routes, shows the NotFound page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

// Export the App component as the default export
export default App;
