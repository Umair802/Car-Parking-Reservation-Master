// app/auth/login/page.tsx

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import ErrorApiText from "@/components/ErrorApiText";
import { callApiHook } from "@/utils/apifuncs";
import { loginApi } from "@/services/apis";
import Link from "next/link";
import Cookies from "js-cookie";
import { Cookie } from "next/font/google";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoginLoading, isLoginError, callLoginApi] = useApi({ notify: true });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await callApiHook({
      apiCall: callLoginApi(loginApi(formData)),
      successCallBack(response) {
        Cookies.set("user", JSON.stringify(response?.data));
        Cookies.set("token", JSON.stringify(response?.token));
        router.push("/dashboard");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[650px]">
      <p className="mb-5 text-gray-800 text-center">
        Enter your credentails to login to your account
      </p>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-orange-600 mt-4 p-3 rounded-lg w-full text-white"
        disabled={!!isLoginLoading}
      >
        {isLoginLoading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-gray-600 text-center">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </p>

      <ErrorApiText error={isLoginError} />
    </form>
  );
}
