// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import {
  ContainerAddRequest,
  ContainerAddResponse,
  nodeError,
} from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  AddTempContainerReply,
  AddTempContainerRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";
import { v4 } from "uuid";

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
    formData,
    title,
    sourceId,
    sub,
  } = JSON.parse(req.body) as ContainerAddRequest;
  var docReq: AddTempContainerRequest = AddTempContainerRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    accessRight: accessRight,
    memLimit: memLimit,
    numCPU: numCPU,
    imageName: imageName,
    sub: sub,
  });

  const tempId = v4();
  try {
    await redisHelper.insert.workspaces(sub, {
      tempId,
      cause: event,
      containerId: "",
      title: title,
      data: formData,
      sourceId: sourceId,
    });
    grpcClient.addTempContainer(
      docReq,
      async function (err, GoLangResponse: AddTempContainerReply) {
        if (err || !GoLangResponse || !GoLangResponse.success) {
          // the request fail so we remove it from redis
          await redisHelper.remove.workspaces(sub, tempId);
        } else {
          await redisHelper.onReturn.workspaces(
            sub,
            tempId,
            GoLangResponse.tempContainerId
          );
        }
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          containerId: GoLangResponse.tempContainerId,
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
