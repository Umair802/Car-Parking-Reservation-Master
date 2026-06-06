// utils/jwt.js

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRATION = "1d"; // Token expiration time

// Function to generate JWT
export const generateToken = (user: any) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Function to verify JWT
export const verifyToken = (token: any) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const validateJwtHeaderAndDecode = async (req, res) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ error: "Missing or invalid token" }, { status: 401 });
  }

  const token = JSON.parse(authHeader.split(" ")[1]);

  if (!token) {
    return res.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Decode the token to get the user info
  const decoded = jwt.verify(token, JWT_SECRET) as any;

  console.log({ decoded });

  if (!decoded?._id || !decoded?.role) {
    return res.json({ error: "Invalid token" }, { status: 403 });
  }

  return { user: decoded, token };
};
