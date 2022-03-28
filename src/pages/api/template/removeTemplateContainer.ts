// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";
import {
  SuccessStringReply,
  RemoveContainerRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  var client = grpcClient;
  var body = JSON.parse(req.body);
  const { sub } = req.query;

  var docReq: RemoveContainerRequest = RemoveContainerRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    containerID: body.containerId,
    sub: sub as string,
  });
  try {
    client.removeTemplateContainer(
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

export const config = {
  api: {
    externalResolver: true
  }
}