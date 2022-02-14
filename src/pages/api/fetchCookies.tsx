// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {parse} from 'cookie'

import { FetchCookieResponse } from "../../lib/api/api";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchCookieResponse>
  ) {
    //console.log(req.headers.cookie!)
    const {sub, name, email, userId, semesterId , darkMode, bio, role} = parse(req.headers.cookie!)
    res.json({
        sub,
        name,
        email,
        userId,
        semesterId,
        darkMode,
        bio,
        role,
    })
  }