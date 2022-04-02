// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { grpcClient } from "../../../lib/grpcClient";
import {
  AddTemplateContainerRequest,
  ContainerAddResponse,
  nodeError,
} from "../../../lib/api/api";
import {
  AddContainerReply,
  AddContainerRequest,
} from "../../../proto/dockerGet/dockerGet";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import redisHelper from "../../../lib/redisHelper";
import { v4 } from "uuid";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerAddResponse>
) {
  const {
    imageName,
    memLimit,
    numCPU,
    section_user_id,
    template_id,
    accessRight,
    useFresh,
    title,
    sub,
    event, // it could be a student start workspace or instructor start template workspace
  } = JSON.parse(req.body) as AddTemplateContainerRequest;
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
  const tempId = v4();
  try {
    await redisHelper.insert.workspaces(sub, {
      title,
      tempId,
      containerId: "",
      cause: event,
    });
    grpcClient.addTemplateContainer(
      docReq,
      async function (err, GoLangResponse: AddContainerReply) {
        if (err || !GoLangResponse.success) {
          // the request fail so we remove it from redis
          await redisHelper.remove.workspaces(sub, tempId);
        } else {
          await redisHelper.onReturn.workspaces(
            sub,
            tempId,
            GoLangResponse.containerID
          );
        }
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
    console.error(error.stack);
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
