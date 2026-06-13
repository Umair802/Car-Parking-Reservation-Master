import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/dbModels/User"; // Assuming the User model exists
import { validateJwtHeaderAndDecode } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectDB();

    const authResult = await validateJwtHeaderAndDecode(req, NextResponse);
    if (!(authResult as any)?.user) {
      return authResult as any;
    }

    const { user } = authResult as any;

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: admin access required" },
        { status: 403 }
      );
    }

    const users = await User.find({ role: { $ne: "admin" } }); // $ne means "not equal"

    return NextResponse.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return NextResponse.json(
      { message: err.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}
