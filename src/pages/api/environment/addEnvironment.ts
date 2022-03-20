// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { EnvironmentAddResponse ,nodeError} from "../../../lib/api/api";

import {  AddEnvironmentReply,  AddEnvironmentRequest } from '../../../proto/dockerGet/dockerGet_pb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentAddResponse>
  ) {
    var client = grpcClient
    const {libraries, name, section_user_id, description} = JSON.parse(req.body);


    var docReq = new AddEnvironmentRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setLibrariesList(libraries);
    docReq.setName(name);
    docReq.setSectionUserId(section_user_id);
    docReq.setDescription(description)
    try{
      client.addEnvironment(docReq, function(err, GoLangResponse: AddEnvironmentReply) {

        res.json({ 
          success:GoLangResponse.getSuccess(),
          error:{
            status: GoLangResponse.getError()?.getStatus(),
            error: GoLangResponse.getError()?.getError(),
          } ,
          environmentID: GoLangResponse.getEnvironmentid(),
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