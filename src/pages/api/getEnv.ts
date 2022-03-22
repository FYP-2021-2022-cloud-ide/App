// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) 
{
    res.json({
        FirebaseApiKey : process.env.FirebaseApiKey,
        FirebaseProjectId: process.env.FirebaseProjectId,
        FirebaseMessagingSenderId : process.env.FirebaseMessagingSenderId,
        FirebaseAppId: process.env.FirebaseAppId,
        Containers_limit :process.env.CONTAINERSLIMIT,
    })
    res.status(200).end();   
}