// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  EnvironmentIdRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { envId, section_user_id, sectionId } = JSON.parse(req.body); //console.log(body)
  const userId = getCookie(req.headers.cookie, "userId");
  var docReq = EnvironmentIdRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    environmentID: envId,
    sectionUserId: section_user_id,
  });
  try {
    await redisHelper.insert.removeEnvironment(sectionId as string, {
      id: envId,
      removedBy: userId,
    });
    grpcClient.removeEnvironment(
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
  } finally {
    await redisHelper.remove.removeEnvironment(sectionId as string, {
      id: envId,
      removedBy: userId,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
