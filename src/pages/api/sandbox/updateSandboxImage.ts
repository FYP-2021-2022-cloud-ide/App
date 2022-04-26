// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import {
  SuccessStringResponse,
  nodeError,
  UpdateSandboxImageRequest,
} from "../../../lib/api/api";
import { redisClient } from "../../../lib/redisClient";
import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  UpdateSandBoxImageRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  var client = grpcClient;

  const { sandboxImageId, description, containerId, title, userId } =
    JSON.parse(req.body) as UpdateSandboxImageRequest;

  var docReq = UpdateSandBoxImageRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sandBoxImageId: sandboxImageId,
    description: description,
    tempContainerId: containerId,
    title: title,
    userId: userId,
  });

  try {
    client.updateSandboxImage(
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
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
