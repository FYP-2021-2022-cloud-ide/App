// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SandboxImageListResponse, nodeError } from "../../../lib/api/api";
import { redisClient } from "../../../lib/redisClient";
import { grpcClient } from "../../../lib/grpcClient";
import {
  ListSandBoxImageReply,
  ListSandBoxImageRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxImageListResponse>
) {
  const { userId } = req.query!;
  try {
    var docReq = ListSandBoxImageRequest.fromPartial({
      sessionKey: fetchAppSession(req),
      userId: userId as string,
    });
    grpcClient.listSandboxImage(
      docReq,
      function (err, GoLangResponse: ListSandBoxImageReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          sandboxImages: GoLangResponse.sandboxImages.map((sandbox) => {
            console.log(sandbox);
            return {
              id: sandbox.id,
              title: sandbox.title,
              description: sandbox.description,
              imageId: sandbox.imageId,
              containerId: sandbox.sandboxId[0],
            };
          }),
        });
        console.log("list sandbox done");
        res.status(200).end();
      }
    );
  } catch (error) {
    console.log(error.stack);
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
