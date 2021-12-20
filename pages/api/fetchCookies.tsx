// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {parse} from 'cookie'

type Data = {
  sub: string
  name: string
  email: string
  userId: string
  semesterId: string
  //cutMes: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    const {sub, name, email, userId, semesterId} = parse(req.headers.cookie!)
    res.json({
        sub,
        name,
        email,
        userId,
        semesterId
    })
  }