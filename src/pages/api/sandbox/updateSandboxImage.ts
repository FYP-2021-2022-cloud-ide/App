// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";
import { redisClient } from "../../../lib/redisClient";
import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  UpdateSandBoxImageRequest,
} from "../../../proto/dockerGet/dockerGet";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  var client = grpcClient;

  const { sandboxImageId, description, tempContainerId, title, userId } =
    JSON.parse(req.body);

  var docReq = UpdateSandBoxImageRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sandBoxImageId: sandboxImageId,
    description: description,
    tempContainerId: tempContainerId,
    title: title,
    userId: userId,
  });

  try {
    redisHelper.insert.updateSandbox(userId, {
      title,
      description,
      id: sandboxImageId,
    });
    client.updateSandboxImage(
      docReq,
      async function (err, GoLangResponse: SuccessStringReply) {
        // await redisClient.del(redisKey);
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
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
    redisHelper.remove.updateSandbox(userId, {
      title,
      description,
      id: sandboxImageId,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
