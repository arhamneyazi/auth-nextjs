"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  // 1. The Temporary Clipboard: Store the email the user types in
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. The Waiter: Takes the email and sends it to your backend
  const onForgotPassword = async () => {
    try {
      setLoading(true);
      // We send the email to our new backend route
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Reset email sent! Check your inbox.");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : undefined;
      toast.error(message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // 3. The UI: What the user actually sees and clicks
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Forgot Password</h1>
      <p className="mb-4 text-gray-400">
        Enter your email to get a reset link.
      </p>

      <label htmlFor="email">Email:</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 hover:bg-gray-800 cursor-pointer"
        onClick={onForgotPassword}
        disabled={email.length === 0 || loading}
      >
        {loading ? "Processing..." : "Send Reset Link"}
      </button>

      <Link href="/login" className="text-blue-500 mt-4">
        Back to Login
      </Link>
    </div>
  );
}
