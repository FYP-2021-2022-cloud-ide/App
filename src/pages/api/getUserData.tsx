// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../lib/fetchAppSession';

import { GetUserDataResponse  ,nodeError} from "../../lib/api/api";

import {grpcClient}from '../../lib/grpcClient'
import { GetUserDataReply, GetUserDataRequest } from '../../proto/dockerGet/dockerGet_pb';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserDataResponse>
  ) 
{
  var client = grpcClient
    const{sub}=req.query;

    var docReq = new GetUserDataRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub as string);
    try{
        client.getUserData(docReq, function(err, GoLangResponse: GetUserDataReply) {
        res.json({
            success: GoLangResponse.getSuccess(),
            error:{
                status: GoLangResponse.getError().getStatus(),
                error: GoLangResponse.getError().getError(),
            } ,
            userId: GoLangResponse.getUserid(),
            role:GoLangResponse.getRole(),
            semesterId: GoLangResponse.getSemesterid(),
            darkMode:GoLangResponse.getDarkmode(),
            bio:GoLangResponse.getBio(),
        })
        res.status(200).end();
        })
    }
    catch(error) {
        //@ts-ignore
        res.json({
          success:false,
          error:nodeError(error) ,
        });
        res.status(405).end();
    }
}