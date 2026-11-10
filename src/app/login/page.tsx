"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-slate-950 text-white">
      <div className="flex flex-col w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-center">
          {" "}
          {loading ? "Processing" : "Login"}
        </h1>
        <hr className="my-6 border-slate-800" />
        <label htmlFor="email" className="mb-1 text-sm text-slate-300">
          Email:
        </label>
        <input
          className="w-full px-3 py-2 mb-4 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          id="email"
          type="text"
          value={user.email}
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password" className="mb-1 text-sm text-slate-300">
          Password:
        </label>
        <input
          className="w-full px-3 py-2 mb-4 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          id="password"
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="w-full py-2 mt-2 font-medium rounded-lg bg-indigo-500 text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          onClick={onLogin}
        >
          {buttonDisabled ? "Please wait..." : "Login"}
        </button>
        <Link
          href="/signup"
          className="mt-6 text-center text-sm text-slate-400 hover:text-white"
        >
          Visit Signup Page
        </Link>
      </div>
    </div>
  );
}
