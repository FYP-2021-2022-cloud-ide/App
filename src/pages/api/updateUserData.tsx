// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
}



import {grpcClient}from '../../lib/grpcClient'
import { SuccessStringReply   ,UpdateUserDataRequest } from '../../proto/dockerGet/dockerGet_pb';

  
function unauthorized(){
  return({
      success: false,
      message: "unauthorized",
  })
}
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
    const { darkMode, bio} = JSON.parse(req.body);//console.log(body)
    // if(!authentication(sub, req.oidc.user.sub)){
    //     res.json(unauthorized())
    //     return
    // } 
    var docReq = new UpdateUserDataRequest();
    docReq.setSub(sub as string);
    docReq.setDarkmode(darkMode);
    docReq.setBio(bio);
    try{
        client.updateUserData(docReq, function(err, GoLangResponse: SuccessStringReply) {
        if(!GoLangResponse.getSuccess()){
            console.log(GoLangResponse.getMessage())
        }
        
        res.json({
            success : GoLangResponse.getSuccess(),
            message: GoLangResponse.getMessage(),
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