// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  SandBoxImageIdRequest,
} from "../../../proto/dockerGet/dockerGet";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { sandboxImageId, userId } = JSON.parse(req.body);
  var docReq = SandBoxImageIdRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sandBoxImageId: sandboxImageId,
    userId: userId,
  });
  try {
    await redisHelper.insert.removeSandbox(userId, {
      id: sandboxImageId,
    });
    grpcClient.removeSandboxImage(
      docReq,
      function (err, GoLangResponse: SuccessStringReply) {
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
    redisHelper.remove.removeSandbox(userId, {
      id: sandboxImageId,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
