import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

// TODO: email verification is now live. Register flow sends a verification email.

// TODO before go-live: switch to email-based auth (update backend User model to include email field, update login endpoint, update this form to use email input)

function Form({ route, method }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();

    const isLogin = method === "login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, { email, password });
            if (isLogin) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/dashboard");
            } else {
                setRegistered(true);
            }
        } catch (error) {
            const msg = error?.response?.data?.detail || error?.response?.data?.email?.[0] || "Something went wrong. Please try again.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    if (registered) {
        return (
            <div className="min-h-screen bg-cream dark:bg-navy flex items-center justify-center px-4">
                <div className="w-full max-w-sm text-center">
                    <div className="text-5xl mb-4">📬</div>
                    <h1 className="font-serif text-2xl text-ember dark:text-gold mb-3">Check your email!</h1>
                    <p className="text-sm font-sans text-gray-600 dark:text-parchment/70 leading-relaxed">
                        We sent a verification link to <strong>{email}</strong>.<br />
                        Click the link in the email to activate your account.
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

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3 select-none" aria-hidden="true">🌙</div>
                    <h1 className="font-serif text-3xl text-ember dark:text-gold">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 dark:text-parchment/60 text-sm font-sans mt-1">
                        {isLogin ? "Sign in to your reading tracker" : "Join Sarah's Suggestions"}
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-xl border border-gold/20 bg-white/80 dark:bg-navy-light shadow-md shadow-gold/5 p-8">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                        {/* Email */}
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

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-baseline mb-1.5">
                                <label htmlFor="password" className="text-sm font-sans font-medium text-gray-700 dark:text-parchment">
                                    Password
                                </label>
                                {isLogin && (
                                    <a href="/forgot-password" className="text-xs font-sans text-ember dark:text-gold hover:underline">
                                        Forgot password?
                                    </a>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-gold/30 bg-white dark:bg-navy text-gray-800 dark:text-cream font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder:text-gray-400 dark:placeholder:text-parchment/40"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg bg-gold text-navy font-semibold font-sans text-sm hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                        >
                            {loading ? <LoadingIndicator /> : isLogin ? "Sign In" : "Create Account"}
                        </button>

                        {/* Toggle link */}
                        <p className="text-center text-sm font-sans text-gray-500 dark:text-parchment/60">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <a
                                href={isLogin ? "/register" : "/login"}
                                className="text-ember dark:text-gold hover:underline font-medium"
                            >
                                {isLogin ? "Register" : "Sign in"}
                            </a>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;
