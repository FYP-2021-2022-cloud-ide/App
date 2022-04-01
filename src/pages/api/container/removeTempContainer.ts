// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  RemoveTempContainerRequest,
} from "../../../proto/dockerGet/dockerGet";
import redisHelper from "../../../lib/redisHelper";
import { getCookie } from "../../../lib/cookiesHelper";
import { redis } from "googleapis/build/src/apis/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { containerId, sub } = JSON.parse(req.body);
  const userId = getCookie(req.headers.cookie, "userId");
  var docReq: RemoveTempContainerRequest =
    RemoveTempContainerRequest.fromPartial({
      sessionKey: fetchAppSession(req),
      containerId: containerId,
      sub: sub as string,
    });

  try {
    grpcClient.removeTempContainer(
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
