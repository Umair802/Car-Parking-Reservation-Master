"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { callApiHook } from "@/utils/apifuncs";
import { registerApi } from "@/services/apis";
import ErrorApiText from "@/components/ErrorApiText";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegisterLoading, isRegisterError, callRegisterApi] = useApi({
    notify: true,
  });
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    // Clear previous error
    setPasswordMatchError("");


    // Proceed with API call if passwords match
    await callApiHook({
      apiCall: callRegisterApi(registerApi(formData)),
      successCallBack(data) {
        console.log(data);
        router.push("/login");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[650px]">
      <p className="mb-5 text-gray-800 text-center">
        Enter your details to register your account
      </p>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          required
        />
      </div>

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

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-orange-600 mt-4 p-3 rounded-lg w-full text-white"
        disabled={isRegisterLoading}
      >
        {isRegisterLoading ? "Registering..." : "Register"}
      </button>

      <ErrorApiText error={isRegisterError || passwordMatchError} />

      <p className="mt-4 text-gray-600 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
}
