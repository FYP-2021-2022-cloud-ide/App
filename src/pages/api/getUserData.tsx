// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    success:boolean
    userId:string
    semesterId:string
    darkMode:boolean
    bio:string
}


import {grpcClient}from '../../lib/grpcClient'
import { SubRequest   ,GetUserDataReply } from '../../proto/dockerGet/dockerGet_pb';


function authentication(sub: string|string[], oidcSub: string){
    if(sub == undefined){
      return false
    }else{
      if(sub != oidcSub)
        return false
    }
    return true
  }
  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
  var client = grpcClient()
    const{sub}=req.query;
    // if(!authentication(sub, req.oidc.user.sub)){
    //     res.status(405).end();
    //     return
    // } 
    var docReq = new SubRequest();
    docReq.setSub(sub as string);
    try{
        client.getUserData(docReq, function(err, GoLangResponse: GetUserDataReply) {
        if(!GoLangResponse.getSuccess()){
            console.log(GoLangResponse.getMessage())
        }
        
        res.json({
            success: GoLangResponse.getSuccess(),
            userId: GoLangResponse.getUserid(),
            semesterId: GoLangResponse.getSemesterid(),
            darkMode:GoLangResponse.getDarkmode(),
            bio:GoLangResponse.getBio(),
        })
        res.status(200).end();
        })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
}