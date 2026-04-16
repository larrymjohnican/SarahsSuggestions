import { useState } from "react";
import api from "../api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/user/request-reset", { email });
        } catch {
            // Fail silently — always show the success state so we don't reveal
            // whether an email address is registered
        } finally {
            setSubmitted(true);
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-cream dark:bg-navy flex items-center justify-center px-4">
                <div className="w-full max-w-sm text-center">
                    <div className="text-5xl mb-4">📬</div>
                    <h1 className="font-serif text-2xl text-ember dark:text-gold mb-3">Check your email</h1>
                    <p className="text-sm font-sans text-gray-600 dark:text-parchment/70 leading-relaxed">
                        If <strong>{email}</strong> is registered, we've sent a password reset link. It expires in 1 hour.
                    </p>
                    <a href="/login" className="inline-block mt-6 text-sm text-ember dark:text-gold hover:underline font-sans">
                        Back to login →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-navy flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3 select-none" aria-hidden="true">🌙</div>
                    <h1 className="font-serif text-3xl text-ember dark:text-gold">Forgot Password</h1>
                    <p className="text-gray-500 dark:text-parchment/60 text-sm font-sans mt-1">
                        Enter your email and we'll send a reset link
                    </p>
                </div>

                <div className="rounded-xl border border-gold/20 bg-white/80 dark:bg-navy-light shadow-md shadow-gold/5 p-8">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-sans font-medium text-gray-700 dark:text-parchment mb-1.5">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-gold/30 bg-white dark:bg-navy text-gray-800 dark:text-cream font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder:text-gray-400 dark:placeholder:text-parchment/40"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg bg-gold text-navy font-semibold font-sans text-sm hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                        >
                            {loading ? "Sending…" : "Send Reset Link"}
                        </button>

                        <p className="text-center text-sm font-sans text-gray-500 dark:text-parchment/60">
                            <a href="/login" className="text-ember dark:text-gold hover:underline font-medium">
                                Back to login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
