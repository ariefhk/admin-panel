import { UserService } from "@/services/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } else if (req.method === "POST") {
    const user = await UserService.create(req.body);
    return res.status(201).json(user);
  }
}
