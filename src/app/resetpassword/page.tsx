"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", { token, password });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : "An error has occurred";
      console.log(errorData);
      toast.error(errorData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split(`=`)[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-4xl">
        {loading ? "Processing..." : "Reset Password"}
      </h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "No token"}
      </h2>

      <label htmlFor="password">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={password}
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 cursor-pointer"
        onClick={resetPassword}
        disabled={!token || password.length < 8 || loading}
      >
        Reset password
      </button>
      <p>
        {password.length < 8 ? "Password must be atleast 8 characters" : ""}
      </p>
    </div>
  );
}
