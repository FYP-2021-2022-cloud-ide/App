// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { ContainerAddResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  AddTempContainerReply,
  AddTempContainerRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper, { eventToContainerType } from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerAddResponse>
) {
  const {
    memLimit,
    numCPU,
    imageId: imageName,
    accessRight,
    event,
    title,
    sub,
  } = JSON.parse(req.body);
  var docReq: AddTempContainerRequest = AddTempContainerRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    accessRight: accessRight,
    memLimit: memLimit,
    numCPU: numCPU,
    imageName: imageName,
    sub: sub,
  });
  const userId = getCookie(req.headers.cookie, "userId");
  const patch = ((event == "ENV_CREATE" ||
    event == "TEMPLATE_CREATE" ||
    event == "SANDBOX_CREATE") && {
    cause: event,
    title: title,
  }) || {
    cause: event,
    id: imageName,
    title: title,
  };
  try {
    await redisHelper.insert.createWorkspace(userId, patch);
    grpcClient.addTempContainer(
      docReq,
      async function (err, GoLangResponse: AddTempContainerReply) {
        await redisHelper.insert.patchCreatedWorkspace(userId, {
          id: GoLangResponse.tempContainerId,
          type: eventToContainerType(event),
          isTemporary: true,
          createData: patch,
        });
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          containerID: GoLangResponse.tempContainerId,
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
  } finally {
    await redisHelper.remove.createWorkspace(userId, patch);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
