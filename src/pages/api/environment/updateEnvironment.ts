// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  UpdateEnvironmentRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { envId, name, section_user_id, containerId, description, sectionId } =
    JSON.parse(req.body);
  const userId = getCookie(req.headers.cookie, "userId");

  var docReq = UpdateEnvironmentRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    environmentID: envId,
    name: name,
    sectionUserId: section_user_id,
    containerID: containerId,
    description: description,
  });
  try {
    await redisHelper.insert.updateEnvironment(sectionId, {
      title: name,
      description: description,
      id: envId,
      updatedBy: userId,
    });
    grpcClient.updateEnvironment(
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
    await redisHelper.remove.updateEnvironment(sectionId, {
      title: name,
      description: description,
      id: envId,
      updatedBy: userId,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
