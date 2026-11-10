"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserData(res.data.data._id);
    } catch (error) {
      toast.error("Please log in first");
      router.push("/login");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-slate-950 text-white">
      <div className="flex flex-col items-center w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <hr className="my-6 w-full border-slate-800" />
        <p className="text-sm text-slate-400">Profile Page</p>
        <h2 className="mt-4 max-w-full break-all rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-300">
          {userData ? (
            <Link
              href={`/profile/${userData}`}
              className="hover:text-indigo-200 hover:underline"
            >
              {userData}
            </Link>
          ) : (
            "No data found"
          )}
        </h2>
        <hr className="my-6 w-full border-slate-800" />
        <button
          className="w-full py-2 font-medium rounded-lg bg-indigo-500 text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="w-full py-2 mt-3 font-medium rounded-lg border border-slate-700 bg-slate-950 text-slate-200 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          onClick={getUserDetails}
        >
          Get User Data
        </button>
      </div>
    </div>
  );
}
