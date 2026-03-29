import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";

function Verify() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("loading"); // loading | success | error
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) {
            setStatus("error");
            setMessage("No verification token found in this link.");
            return;
        }

        api.get(`/api/user/verify?token=${token}`)
            .then(() => {
                setStatus("success");
                setMessage("Your email has been verified! You can now log in.");
                setTimeout(() => navigate("/login"), 3000);
            })
            .catch((err) => {
                setStatus("error");
                setMessage(err?.response?.data?.detail || "Invalid or expired verification link.");
            });
    }, []);

    return (
        <div className="min-h-screen bg-cream dark:bg-navy flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center">
                <div className="text-5xl mb-4 select-none">{status === "loading" ? "⏳" : status === "success" ? "✅" : "❌"}</div>
                <h1 className="font-serif text-2xl text-ember dark:text-gold mb-3">
                    {status === "loading" ? "Verifying..." : status === "success" ? "Email Verified!" : "Verification Failed"}
                </h1>
                <p className="text-sm font-sans text-gray-600 dark:text-parchment/70">
                    {status === "loading" ? "Checking your verification link..." : message}
                </p>
                {status === "success" && (
                    <p className="text-xs text-gray-400 dark:text-parchment/40 mt-3 font-sans">Redirecting you to login...</p>
                )}
                {status === "error" && (
                    <a href="/login" className="inline-block mt-6 text-sm text-ember dark:text-gold hover:underline font-sans">
                        Go to login →
                    </a>
                )}
            </div>
        </div>
    );
}

export default Verify;
