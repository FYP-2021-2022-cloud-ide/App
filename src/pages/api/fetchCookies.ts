// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

import crypto from "crypto";

import { FetchCookieResponse } from "../../lib/api/api";
import { redisClient } from "../../server";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchCookieResponse>
) {
  try {
    const decrypt = (encrypted: string) => {
      let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        crypto.scryptSync(process.env.SESSIONSECRET, "GfG", 32),
        process.env.SESSIONIV
      );
      let decrypted = decipher.update(encrypted, "base64", "utf8");
      return decrypted + decipher.final("utf8");
    };
    const { sub, name, email, userId, semesterId } = parse(req.headers.cookie!);
    if (!sub || !name || !userId)
      throw new Error(
        `something is missing in cookies. cookies: ${req.headers.cookie}`
      );
    console.log(req.headers.cookie);
    res.json({
      success: true,
      cookies: {
        sub: decrypt(sub),
        name: decrypt(name),
        email: decrypt(email),
        userId: decrypt(userId),
        semesterId: decrypt(semesterId),
      },
    });
  } catch (error) {
    console.error(error.stack);
    res.json({
      success: false,
      error: error,
    });
    res.status(405).end();
  }
}
