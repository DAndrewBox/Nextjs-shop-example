import axios from "axios";
import { User } from "@/types/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getStaticPaths(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const { method, body } = req;

  if (method === "POST") {
    const response = await axios.get("https://fakestoreapi.com/users");
    const { data } = response;

    data.forEach((user: User) => {
      if (user.email === body.email && user.password === body.password) {
        return res.status(200).json(user);
      }
    });

    res.status(200).json(null);
  }
}
