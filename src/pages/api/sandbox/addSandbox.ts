// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import {
  SandboxAddResponse,
  nodeError,
  SandboxAddRequest,
} from "../../../lib/api/api";
import { grpcClient } from "../../../lib/grpcClient";
import {
  AddSandBoxReply,
  AddSandBoxRequest,
} from "../../../proto/dockerGet/dockerGet";
import { v4 } from "uuid";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxAddResponse>
) {
  const { memLimit, numCPU, sandboxImageId, title, sub } = JSON.parse(
    req.body
  ) as SandboxAddRequest;
  const tempId = v4();
  try {
    await redisHelper.insert.workspaces(sub, {
      tempId,
      title,
      cause: "SANDBOX_START_WORKSPACE",
      containerId: "",
      data: sandboxImageId,
    });
    var docReq = AddSandBoxRequest.fromPartial({
      sessionKey: fetchAppSession(req),
      memLimit: memLimit,
      numCPU: numCPU,
      sandBoxImageId: sandboxImageId,
    });
    // need to wrap grpc call because grpc call is synchronize and finally will be directly carried out
    grpcClient.addSandbox(
      docReq,
      async function (err, GoLangResponse: AddSandBoxReply) {
        if (err || !GoLangResponse.success) {
          // the request fail so we remove it from redis
          await redisHelper.remove.workspaces(sub, tempId);
        } else {
          await redisHelper.onReturn.workspaces(
            sub,
            tempId,
            GoLangResponse.sandBoxId
          );
        }
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
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
