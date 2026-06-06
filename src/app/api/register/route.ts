import { connectDB } from "@/lib/db";
import { User } from "@/dbModels/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return Response.json({ user });
}
