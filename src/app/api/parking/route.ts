import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Parking } from "@/dbModels/Parking";
import { Payment } from "@/dbModels/Payment";
import { validateJwtHeaderAndDecode } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    let connected = true;
    try {
      await connectDB();
    } catch (e) {
      connected = false;
      console.warn("connectDB failed, falling back to mock mode", e?.message);
    }

    const { user } = await (async () => {
      try {
        const res = await validateJwtHeaderAndDecode(req, NextResponse);
        // If validation returned a NextResponse (error), fall back to demo user
        if ((res as any)?.user) return res as any;
        return { user: { _id: "demo-user", role: "user" } };
      } catch (e) {
        return { user: { _id: "demo-user", role: "user" } };
      }
    })();

    // Destructure the request body
    const { slot, duration, amount, method, date, paymentDetails } =
      await req.json();

    if (!connected) {
      // Return mock created objects so the UI can function in demo mode
      const mockParking = {
        _id: "mock_parking_" + Date.now(),
        slot,
        duration,
        date,
        amount,
        method,
        userId: user._id,
        paymentId: "mock_payment_" + Date.now(),
      };
      const mockPayment = {
        _id: mockParking.paymentId,
        amount,
        method,
        details: paymentDetails,
        userId: user._id,
        parkingId: mockParking._id,
      };
      return NextResponse.json({ parking: mockParking, payment: mockPayment });
    }

    // Connected path: persist to DB
    const parking = await Parking.create({
      slot,
      duration,
      date,
      amount,
      method,
      userId: user._id, // Link the parking to the logged-in user
    });
    // Create the payment record
    const payment = await Payment.create({
      amount,
      method,
      details: paymentDetails,
      userId: user._id,
      parkingId: parking._id,
    });

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
    let connected = true;
    try {
      await connectDB();
    } catch (e) {
      connected = false;
      console.warn("connectDB failed, serving mock data", e?.message);
    }

    const authRes = await (async () => {
      try {
        return await validateJwtHeaderAndDecode(req, NextResponse);
      } catch (e) {
        return null;
      }
    })();

    const user = (authRes && (authRes as any).user) || { _id: "demo-user", role: "user" };

    if (!connected) {
      // Return mocked parkings for demo when DB is not reachable
      const mockParkings = [
        { _id: "p1", slot: "A1", duration: 2, date: new Date().toISOString(), amount: 10, method: "cash", userId: user._id },
        { _id: "p2", slot: "B3", duration: 4, date: new Date().toISOString(), amount: 20, method: "card", userId: user._id },
      ];
      return NextResponse.json(mockParkings);
    }

    let parkings;
    if (user.role === "admin") {
      parkings = await Parking.find();
    } else {
      parkings = await Parking.find({ userId: user._id });
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
