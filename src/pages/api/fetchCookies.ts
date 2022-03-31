// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

import { FetchCookieResponse } from "../../lib/api/api";
import { decrypt } from "../../lib/cookiesHelper";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchCookieResponse>
) {
  try {
    const { sub, name, email, userId, semesterId } = parse(req.headers.cookie!);
    if (!sub || !name || !userId)
      throw new Error(
        `something is missing in cookies. cookies: ${req.headers.cookie}`
      );
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

export const config = {
  api: {
    externalResolver: true,
  },
};
