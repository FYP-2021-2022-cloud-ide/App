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
import redisHelper from "../../../lib/redisHelper";

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
      async function (err, GoLangResponse: ListSandBoxImageReply) {
        console.log("list sandbox");
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          sandboxImages: await redisHelper.patch.sandboxes(
            userId as string,
            GoLangResponse.sandboxImages.map((sandbox) => {
              return {
                id: sandbox.id,
                title: sandbox.title,
                description: sandbox.description,
                imageId: sandbox.imageId,
                sandboxesId: sandbox.sandboxId[0],
                status: null,
              };
            })
          ),
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
