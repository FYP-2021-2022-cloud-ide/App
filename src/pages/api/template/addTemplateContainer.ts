// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { grpcClient } from "../../../lib/grpcClient";
import { ContainerAddResponse, nodeError } from "../../../lib/api/api";
import {
  AddContainerReply,
  AddContainerRequest,
} from "../../../proto/dockerGet/dockerGet";
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

  var docReq: AddContainerRequest = AddContainerRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    imageName: imageName,
    memLimit: memLimit,
    numCPU: numCPU,
    sectionUserId: section_user_id,
    templateId: template_id,
    accessRight: accessRight,
    useFresh: useFresh,
  });
  try {
    client.addTemplateContainer(
      docReq,
      function (err, GoLangResponse: AddContainerReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          containerID: GoLangResponse.containerID,
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }
}
