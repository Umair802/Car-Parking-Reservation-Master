import { connectDB } from "@/lib/db";
import { User } from "@/dbModels/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    let dbConnected = true;
    try {
      await connectDB();
    } catch (error) {
      dbConnected = false;
      console.warn("Register fallback mode: DB unavailable", error);
    }

    if (!dbConnected) {
      return Response.json({
        user: {
          _id: `demo-${Date.now()}`,
          name,
          email,
          role: "user",
        },
        message: "Registered successfully (demo mode)",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return Response.json({ user, message: "Registered successfully" });
  } catch (error) {
    console.error("Register API error", error);
    return Response.json(
      { message: "Unable to register right now. Please try again." },
      { status: 500 }
    );
  }
}
