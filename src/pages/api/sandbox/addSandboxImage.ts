// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SandboxImageAddResponse, nodeError } from "../../../lib/api/api";
import { redisClient } from "../../../lib/redisClient";
import { grpcClient } from "../../../lib/grpcClient";
import {
  AddSandBoxImageReply,
  AddSandBoxImageRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxImageAddResponse>
) {
  const { description, imageId, title, userId } = JSON.parse(req.body);
  try {
    var docReq = AddSandBoxImageRequest.fromPartial({
      sessionKey: fetchAppSession(req),
      description: description,
      imageId: imageId,
      title: title,
      userId: userId,
    });
    grpcClient.addSandboxImage(
      docReq,
      function (err, GoLangResponse: AddSandBoxImageReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          sandboxImageId: GoLangResponse.sandBoxImageId,
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
