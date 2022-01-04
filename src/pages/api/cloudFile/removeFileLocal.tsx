// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';


type Data = {
  success: boolean
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var body = JSON.parse(req.body);
    var filePath:string=body.filePath
    try{
        fs.unlink(filePath, (err) => {
            if (err) throw err;
            res.json({success:true});
            res.status(200).end();
       });
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }