// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { grpcClient } from "../../../lib/grpcClient";
import { ContainerAddResponse, nodeError } from "../../../lib/api/api";
import {
  AddContainerReply,
  AddContainerRequest,
} from "../../../proto/dockerGet/dockerGet";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";

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
  } = JSON.parse(req.body);
  const userId = getCookie(req.headers.cookie, "userId");
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
    await redisHelper.insert.createWorkspace(userId, {
      cause: "TEMPLATE_START_WORKSPACE",
      id: template_id,
      title: title,
    });
    const grpc = () =>
      new Promise<void>((resolve, reject) => {
        grpcClient.addTemplateContainer(
          docReq,
          async function (err, GoLangResponse: AddContainerReply) {
            await redisHelper.insert.patchCreatedWorkspace(userId, {
              id: GoLangResponse.containerID,
              type: "TEMPLATE",
              isTemporary: false,
              createData: {
                cause: "TEMPLATE_START_WORKSPACE",
                id: template_id,
                title: title,
              },
            });
            res.json({
              success: GoLangResponse.success,
              error: {
                status: GoLangResponse.error?.status,
                error: GoLangResponse.error?.error,
              },
              containerID: GoLangResponse.containerID,
            });
            res.status(200).end();
            if (err) reject(err);
            else resolve();
          }
        );
      });
    await grpc();
  } catch (error) {
    console.error(error.stack);
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  } finally {
    await redisHelper.remove.createWorkspace(userId, {
      cause: "TEMPLATE_START_WORKSPACE",
      id: template_id,
      title: title,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
