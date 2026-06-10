import mongoose from "mongoose";

const MONGODB_URI = (process.env.MONGODB_URI || "") as string;

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not configured");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "parking",
    });
  }

  cached.conn = await cached.promise;

  console.log("database has been connected");
  return cached.conn;
}
