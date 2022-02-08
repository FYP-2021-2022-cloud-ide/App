// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { grpcClient } from "../../../lib/grpcClient";
import {
  AddContainerReply,
  AddContainerRequest,
} from "../../../proto/dockerGet/dockerGet_pb";
import { fetchAppSession } from "../../../lib/fetchAppSession";

type Data = {
  success: boolean;
  message: string;
  containerID: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client = grpcClient();

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
  // docReq.setDbstored(dbStored);
  docReq.setAccessright(accessRight);
  docReq.setUsefresh(useFresh);
  try {
    client.addContainer(
      docReq,
      function (err, GoLangResponse: AddContainerReply) {
        if (!GoLangResponse.getSuccess()) {
          console.log(GoLangResponse.getMessage());
        }
        res.json({
          success: GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          containerID: GoLangResponse.getContainerid(),
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    console.log(error);
    //@ts-ignore
    res.json(error);
    res.status(405).end();
  }
}
