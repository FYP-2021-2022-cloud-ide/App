// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SandboxImageListResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  ListSandBoxImageReply,
  ListSandBoxImageRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxImageListResponse>
) {
  var client = grpcClient;

  const { userId } = req.query!;
  var docReq = ListSandBoxImageRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    userId: userId as string,
  });
  try {
    client.listSandboxImage(
      docReq,
      function (err, GoLangResponse: ListSandBoxImageReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          sandboxImages:
            GoLangResponse.sandboxImages.map((sandbox) => ({
              id: sandbox.id,
              title: sandbox.title,
              description: sandbox.description,
              imageId: sandbox.imageId,
              sandboxesId: sandbox.sandboxId[0],
            })) || [],
        });
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
    externalResolver: true
  }
}