// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { EnvironmentAddResponse } from "../../../lib/api/api";

import {
  AddEnvironmentReply,
  BuildEnvironmentRequest,
} from "../../../proto/dockerGet/dockerGet_pb";
import { grpcClient } from "../../../lib/grpcClient";
import { fetchAppSession } from "../../../lib/fetchAppSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentAddResponse>
) {
  var client = grpcClient();
  const { name, section_user_id, containerId, description } = JSON.parse(
    req.body
  );
  // if (section_user_id != undefined && containerId != undefined){
  //   {/* @ts-ignore */}
  //   if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id)) || !(await checkHaveContainer(containerId, req.oidc.user.sub)) || !(await checkRoleBySectionUserId(req.oidc.user.sub, section_user_id, "instructor")))
  //   {res.json(unauthorized()); return;}
  // }else{
  //   res.json(unauthorized())
  //   return
  // }
  var docReq = new BuildEnvironmentRequest();
  docReq.setSessionKey(fetchAppSession(req));
  docReq.setName(name);
  docReq.setSectionUserId(section_user_id);
  docReq.setContainerid(containerId);
  docReq.setDescription(description);
  try {
    client.buildEnvironment(
      docReq,
      function (err, GoLangResponse: AddEnvironmentReply) {
        if (!GoLangResponse.getSuccess()) {
          console.log(GoLangResponse.getMessage());
        }
        res.json({
          success: GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          environmentID: GoLangResponse.getEnvironmentid(),
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    res.json({
      success:false,
      message:error
    });
    res.status(405).end();
  }
}
