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
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-yellow-400">
        {userData ? (
          <Link href={`/profile/${userData}`}>{userData}</Link>
        ) : (
          "No data found"
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={getUserDetails}
      >
        Get User Data
      </button>
    </div>
  );
}
