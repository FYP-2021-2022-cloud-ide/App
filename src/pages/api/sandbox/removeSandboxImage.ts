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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  var client = grpcClient;

  const { sandboxImageId, userId } = JSON.parse(req.body);
  var docReq = SandBoxImageIdRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sandBoxImageId: sandboxImageId,
    userId: userId,
  });
  try {
    client.removeSandboxImage(
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
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }
}