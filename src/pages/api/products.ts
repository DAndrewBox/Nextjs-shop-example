import axios from "axios";
import { User } from "@/types/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getStaticPaths(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const { method } = req;

  if (method === "GET") {
    const response = await axios.get("https://fakestoreapi.com/products");
    const { data } = response;
    res.status(200).json(data);
  }
}
