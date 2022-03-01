// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { grpcClient } from "../../../lib/grpcClient";
import { ContainerAddResponse,nodeError } from "../../../lib/api/api";
import {
  AddContainerReply,
  AddContainerRequest,
} from "../../../proto/dockerGet/dockerGet_pb";
import { fetchAppSession } from "../../../lib/fetchAppSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerAddResponse>
) {
  var client = grpcClient;

  const {
    imageName,
    memLimit,
    numCPU,
    section_user_id,
    template_id,
    accessRight,
    useFresh,
  } = JSON.parse(req.body); //console.log(body)

  var docReq = new AddContainerRequest();
  docReq.setSessionKey(fetchAppSession(req));
  docReq.setImagename(imageName);
  docReq.setMemlimit(memLimit);
  docReq.setNumcpu(numCPU);
  docReq.setSectionUserId(section_user_id);
  docReq.setTemplateId(template_id);
  docReq.setAccessright(accessRight);
  docReq.setUsefresh(useFresh);
  try {
    client.addContainer(
      docReq,
      function (err, GoLangResponse: AddContainerReply) {
        res.json({
          success: GoLangResponse.getSuccess(),
          error:{
              status: GoLangResponse.getError().getStatus(),
              error: GoLangResponse.getError().getError(),
          } ,
          containerID: GoLangResponse.getContainerid(),
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    res.json({
      success:false,
      error:nodeError(error),
    });
    res.status(405).end();
  }
}
