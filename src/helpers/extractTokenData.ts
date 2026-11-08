import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const extractTokenData = (request: NextRequest): string => {
  const encodedToken = request.cookies.get("token")?.value || "";
  const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
  if (typeof decodedToken === "string" || !decodedToken.id) {
    throw new Error("Invalid token");
  }
  return decodedToken.id;
};
