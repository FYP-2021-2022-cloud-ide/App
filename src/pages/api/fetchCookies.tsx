// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

import { FetchCookieResponse } from "../../lib/api/api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchCookieResponse>
) {
  //console.log(req.headers.cookie!)
  try {
    const { sub, name, email, userId, semesterId, darkMode, bio, role } = parse(
      req.headers.cookie!
    );
    if (!sub || !name || !userId)
      throw new Error(
        `something is missing in cookies. cookies: ${req.headers.cookie}`
      );
    console.log(req.headers.cookie);
    res.json({
      success: true,
      cookies: {
        sub,
        name,
        email,
        userId,
        semesterId,
        darkMode,
        bio,
        role,
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
