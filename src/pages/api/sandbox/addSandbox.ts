// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { SandboxAddResponse, nodeError } from "../../../lib/api/api";
import { redisClient } from "../../../lib/redisClient";
import { grpcClient } from "../../../lib/grpcClient";
import {
  AddSandBoxReply,
  AddSandBoxRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxAddResponse>
) {
  const { memLimit, numCPU, sandboxImageId, title } = JSON.parse(req.body);
  const userId = getCookie(req.headers.cookie, "userId");

  try {
    await redisHelper.insert.createWorkspace(userId, {
      cause: "SANDBOX_START_WORKSPACE",
      id: sandboxImageId,
      title: title,
    });
    var docReq = AddSandBoxRequest.fromPartial({
      sessionKey: fetchAppSession(req),
      memLimit: memLimit,
      numCPU: numCPU,
      sandBoxImageId: sandboxImageId,
    });
    grpcClient.addSandbox(
      docReq,
      async function (err, GoLangResponse: AddSandBoxReply) {
        await redisHelper.insert.patchCreatedWorkspace(userId, {
          id: GoLangResponse.sandBoxId,
          type: "SANDBOX",
          isTemporary: false,
          createData: {
            cause: "SANDBOX_START_WORKSPACE",
            id: sandboxImageId,
            title: title,
          },
        });
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          sandboxId: GoLangResponse.sandBoxId,
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
    await redisHelper.remove.createWorkspace(userId, {
      cause: "SANDBOX_START_WORKSPACE",
      id: sandboxImageId,
      title: title,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
