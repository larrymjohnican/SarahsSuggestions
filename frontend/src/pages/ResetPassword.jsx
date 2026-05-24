import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        return (
            <div className="min-h-screen bg-cream dark:bg-navy flex items-center justify-center px-4">
                <div className="w-full max-w-sm text-center">
                    <div className="text-5xl mb-4 select-none motion-safe:animate-moon-float" aria-hidden="true">🌙</div>
                    <h1 className="font-serif text-2xl text-ember dark:text-gold mb-3">Invalid Link</h1>
                    <p className="text-sm font-sans text-gray-600 dark:text-parchment/70">
                        This reset link is missing or invalid.
                    </p>
                    <a href="/forgot-password" className="inline-block mt-6 text-sm text-ember dark:text-gold hover:underline font-sans">
                        Request a new one →
                    </a>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirm) {
            setError("Passwords don't match.");
            return;
        }
        setLoading(true);
        try {
            await api.post("/api/user/reset-password", { token, password });
            navigate("/login", { state: { message: "Password reset! You can now sign in." } });
        } catch (err) {
            setError(err?.response?.data?.detail || "Something went wrong. The link may have expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-navy flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3 select-none motion-safe:animate-moon-float" aria-hidden="true">🌙</div>
                    <h1 className="font-serif text-3xl text-ember dark:text-gold">New Password</h1>
                    <p className="text-gray-500 dark:text-parchment/60 text-sm font-sans mt-1">
                        Choose a new password for your account
                    </p>
                </div>

                <div className="rounded-xl border border-gold/20 bg-white/80 dark:bg-navy-light shadow-md shadow-gold/5 p-8">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-sans font-medium text-gray-700 dark:text-parchment mb-1.5">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="At least 8 chars, include a letter and number"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-gold/30 bg-white dark:bg-navy text-gray-800 dark:text-cream font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder:text-gray-400 dark:placeholder:text-parchment/40"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm" className="block text-sm font-sans font-medium text-gray-700 dark:text-parchment mb-1.5">
                                Confirm Password
                            </label>
                            <input
                                id="confirm"
                                type="password"
                                placeholder="Repeat your new password"
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-gold/30 bg-white dark:bg-navy text-gray-800 dark:text-cream font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder:text-gray-400 dark:placeholder:text-parchment/40"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 font-sans -mt-2">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg bg-gold text-navy font-semibold font-sans text-sm hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                        >
                            {loading ? "Resetting…" : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
