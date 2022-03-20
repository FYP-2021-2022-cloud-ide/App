// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { SuccessStringResponse,nodeError } from "../../../lib/api/api";

import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,UpdateEnvironmentRequest  } from '../../../proto/dockerGet/dockerGet_pb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) {
    var client = grpcClient
    const{envId, name, section_user_id, containerId, description} = JSON.parse(req.body);


    var docReq = new UpdateEnvironmentRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setEnvironmentid(envId);
    docReq.setName(name);
    docReq.setSectionUserId(section_user_id);
    docReq.setContainerid(containerId);
    docReq.setDescription(description)
    try{
      client.updateEnvironment(docReq, function(err, GoLangResponse: SuccessStringReply) {
        res.json({ 
          success:GoLangResponse.getSuccess(),
          error:{
            status: GoLangResponse.getError()?.getStatus(),
            error: GoLangResponse.getError()?.getError(),
          } ,
        });
        res.status(200).end();
      })
    }
    catch(error) {
        res.json({
          success:false,
          error:nodeError(error) ,
        });
        res.status(405).end();
    }
  }