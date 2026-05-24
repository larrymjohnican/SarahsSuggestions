// Import necessary libraries and components
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ReadingProgress from "./components/ReadingProgress";
// Import custom page components
import BookSuggestions from "./pages/BookSuggestions";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Reviews from "./pages/Reviews";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
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
    const location = useLocation();
    return (
        <>
            <ReadingProgress />
            {/* Keyed on pathname so each route change triggers the fade-in */}
            <div key={location.pathname} className="motion-safe:animate-page-fade">
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
                {/* Password reset routes */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* Catch-all route for undefined routes, shows the NotFound page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            </div>
        </>
    );
}

// Export the App component as the default export
export default App;
