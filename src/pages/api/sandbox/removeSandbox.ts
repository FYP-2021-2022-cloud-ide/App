// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import {
  SuccessStringResponse,
  nodeError,
  RemoveSandboxRequest,
} from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  SandBoxIdRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { sandboxId, userId } = JSON.parse(req.body) as RemoveSandboxRequest;
  console.log(sandboxId, userId);
  try {
    var docReq = SandBoxIdRequest.fromPartial({
      sessionKey: fetchAppSession(req),
      sandBoxId: sandboxId,
      userId: userId,
    });
    grpcClient.removeSandbox(
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
        console.log("remove sandbox server error : ", err);
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
