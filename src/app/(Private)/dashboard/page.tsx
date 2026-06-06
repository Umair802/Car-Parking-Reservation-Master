"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { toast } from "react-toastify";
import api from "@/config/api";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function DashboardPage() {
  const user = useLocalStorage("user");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the admin dashboard
        const usersRes = await api.get("/user");
        const bookingsRes = await api.get("/parking");
        const paymentsRes = await api.get("/payment");

        setTotalUsers(usersRes.data.length);
        setTotalBookings(bookingsRes.data.length);
        setTotalPayments(
          paymentsRes.data
            .reduce((sum, payment) => sum + payment.amount, 0)
            .toFixed(2)
        );
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-6 font-semibold text-3xl">Dashboard</h1>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {user?.role === "admin" ? (
          <>
            <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 rounded-lg">
              <h3 className="font-medium text-gray-700 text-xl">Total Users</h3>
              <p className="font-bold text-purple-600 text-3xl">{totalUsers}</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 rounded-lg">
              <h3 className="font-medium text-gray-700 text-xl">
                Total Bookings
              </h3>
              <p className="font-bold text-blue-600 text-3xl">
                {totalBookings}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 rounded-lg">
              <h3 className="font-medium text-gray-700 text-xl">
                Total Payments
              </h3>
              <p className="font-bold text-green-600 text-3xl">
                {totalPayments} $
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 rounded-lg">
              <h3 className="font-medium text-gray-700 text-xl">
                Total Bookings Made
              </h3>
              <p className="font-bold text-blue-600 text-3xl">
                {totalBookings}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white shadow-lg p-6 rounded-lg">
              <h3 className="font-medium text-gray-700 text-xl">
                Total Paid
              </h3>
              <p className="font-bold text-green-600 text-3xl">
                {totalPayments} $
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
