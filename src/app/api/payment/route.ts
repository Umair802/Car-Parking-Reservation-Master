import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Payment } from "@/dbModels/Payment";
import { validateJwtHeaderAndDecode } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectDB();

    const { user } = await validateJwtHeaderAndDecode(req, NextResponse);
    let payments;

    if (user.role === "admin") {
      payments = await Payment.find();
    } else {
      // Assuming you store user ID inside payment
      payments = await Payment.find({ "userId": user._id });
    }

    return NextResponse.json(payments);
  } catch (err) {
    console.error("Failed to fetch parkings:", err);
    return NextResponse.json(
      { message: err.message || "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
