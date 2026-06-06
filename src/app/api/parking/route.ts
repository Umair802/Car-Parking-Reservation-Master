import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Parking } from "@/dbModels/Parking";
import { Payment } from "@/dbModels/Payment";
import { validateJwtHeaderAndDecode } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { user } = await validateJwtHeaderAndDecode(req, NextResponse);

    // Destructure the request body
    const { slot, duration, amount, method, date, paymentDetails } =
      await req.json();

    // Step 2: Create the parking record, linking it to both payment and user
    const parking = await Parking.create({
      slot,
      duration,
      date,
      amount,
      method,
      userId: user._id, // Link the parking to the logged-in user
    });
    // Step 1: Create the payment record first
    const payment = await Payment.create({
      amount,
      method,
      details: paymentDetails,
      userId: user._id, // Link the payment to the logged-in user
      parkingId: parking._id,
    });

    // Step 3: Update the payment record with the parking ID
    parking.paymentId = payment._id as any;
    await payment.save();

    return NextResponse.json({ parking, payment });
  } catch (err) {
    console.error("Failed to create parking and payment:", err);
    return NextResponse.json(
      { message: err.message || "Failed to create parking and payment" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { user } = await validateJwtHeaderAndDecode(req, NextResponse);
    let parkings;

    if (user.role === "admin") {
      parkings = await Parking.find();
    } else {

        console.log("Gettings user parkings" , user)
      // Assuming you store user ID inside payment
      parkings = await Parking.find({ "userId": user._id });
    }

    return NextResponse.json(parkings);
  } catch (err) {
    console.error("Failed to fetch parkings:", err);
    return NextResponse.json(
      { message: err.message || "Failed to fetch parkings" },
      { status: 500 }
    );
  }
}
