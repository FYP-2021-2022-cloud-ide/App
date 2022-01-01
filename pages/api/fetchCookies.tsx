// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {parse} from 'cookie'

type Data = {
  sub: string
  name: string
  email: string
  userId: string
  semesterId: string
  darkMode:string
  bio:string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    //console.log(req.headers.cookie!)
    const {sub, name, email, userId, semesterId , darkMode,bio} = parse(req.headers.cookie!)
    res.json({
        sub,
        name,
        email,
        userId,
        semesterId,
        darkMode,
        bio,
      
    })
  }