"use client"; // Ensure this page renders client-side

import React from "react";
import { useRouter } from "next/navigation";
import useAuthUser from "./useAuthuser";
import axios from "axios";
import { s } from "./notification/page";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const HomePage = () => {
  const router = useRouter();
  const { user } = useAuthUser();
  const logout = async () => {
    await axios.get("http://127.0.0.1:8000/server/signout/");
    s("Logout Successful");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-10 ">
      {/* Header Section */}
      <div className="container mx-auto flex justify-between items-center mb-12">
        {/* Title */}
        <div className="text-center w-full md:w-3/4">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            Disaster Management Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Monitor and manage relief efforts efficiently
          </p>
        </div>

        {/* Login and Register Buttons */}
        <div className="flex space-x-4">
          {user ? (
            <button
              onClick={logout}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Fund Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 mb-6">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">
            Total Donated Funds
          </h2>
          {/* Bar Chart Placeholder */}
          <div className="mb-4">{/* Include Bar Chart component here */}</div>
          {/* Navigate to Donation Page */}
          <button
            onClick={() => router.push("/donation")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Go to Donation Page
          </button>
        </div>

        {/* Crisis Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 mb-6">
          <h2 className="text-3xl font-semibold text-red-500 mb-4">
            Recent Crises
          </h2>
          {/* Navigate to Crisis Page */}
          <button
            onClick={() => router.push("/crisis")}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
          >
            Go to Crisis Page
          </button>
        </div>

        {/* Volunteer Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 mb-6">
          <h2 className="text-3xl font-semibold text-green-500 mb-4">
            Available Volunteers
          </h2>
          {/* Navigate to Volunteer Page */}
          <button
            onClick={() => router.push("/volunteer")}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
          >
            Go to Volunteer Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
