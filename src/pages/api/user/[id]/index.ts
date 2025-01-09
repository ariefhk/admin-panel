import { UserService } from "@/services/server/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = Number(req?.query?.id);

  if (req.method === "PUT") {
    const user = await UserService.update(userId, req.body);
    return res.status(200).json(user);
  } else if (req.method === "DELETE") {
    const user = await UserService.delete(userId);
    return res.status(200).json(user);
  }
}
