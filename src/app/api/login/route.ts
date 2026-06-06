import { connectDB } from "@/lib/db";
import { User } from "@/dbModels/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectDB();

  const user = await User.findOne({ email: email });

  if (!user) {
    return Response.json({ message: "Invalid credentials" }, { status: 400 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return Response.json({ message: "Invalid credentials" }, { status: 400 });
  }

  const token = generateToken({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return Response.json({
    data: user,
    token,
    message: "User Loggedin Successfully",
  });
}
