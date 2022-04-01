// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  SandBoxIdRequest,
} from "../../../proto/dockerGet/dockerGet";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { sandboxId, userId } = JSON.parse(req.body);
  try {
    await redisHelper.insert.removeWorkspace(userId, {
      id: sandboxId,
    });
    var docReq = SandBoxIdRequest.fromPartial({
      sessionKey: fetchAppSession(req),
      sandBoxId: sandboxId,
      userId: userId,
    });
    const grpc = () =>
      new Promise<void>((resolve, reject) => {
        grpcClient.removeSandbox(
          docReq,
          async function (err, GoLangResponse: SuccessStringReply) {
            await redisHelper.remove.patchedWorkspace(userId, sandboxId);
            res.json({
              success: GoLangResponse.success,
              error: {
                status: GoLangResponse.error?.status,
                error: GoLangResponse.error?.error,
              },
            });
            res.status(200).end();
            console.log("remove sandbox server error : ", err);
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
    await redisHelper.remove.removeWorkspace(userId, {
      id: sandboxId,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
