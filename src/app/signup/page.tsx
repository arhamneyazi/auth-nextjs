"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-slate-950 text-white">
      <div className="flex flex-col w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-center">
          {loading ? "Processing" : "Signup"}
        </h1>

        <hr className="my-6 border-slate-800" />

        <label className="mb-1 text-sm text-slate-300" htmlFor="username">
          Username:
        </label>
        <input
          className="w-full px-3 py-2 mb-4 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          id="username"
          type="text"
          value={user.username}
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label className="mb-1 text-sm text-slate-300" htmlFor="email">
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

        <label className="mb-1 text-sm text-slate-300" htmlFor="password">
          Password:
        </label>
        <input
          className="w-full px-3 py-2 mb-6 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          id="password"
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          className="w-full py-2 font-medium rounded-lg bg-indigo-500 text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-500"
          onClick={onSignup}
          disabled={buttonDisabled || loading}
        >
          {buttonDisabled ? "You can't signup yet" : "Click to Signup"}
        </button>

        <Link
          href="/login"
          className="mt-6 text-center text-sm text-slate-400 hover:text-white"
        >
          Visit Login Page
        </Link>
      </div>
    </div>
  );
}
