import { NextApiRequest, NextApiResponse } from "next";

interface LoginResponse {
  id: string;
  email: string;
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse | { error: string }>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;
console.log(email,password)
  // Your custom authentication logic (replace this with your real logic)
  if (email === "test@example.com" && password === "password123") {
    return res.status(200).json({
      id: "123",
      email: "test@example.com",
      name: "John Doe",
    });
  }

  return res.status(401).json({ error: "Invalid email or password" });
}
