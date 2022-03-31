// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { EnvironmentAddResponse, nodeError } from "../../../lib/api/api";

import {
  AddEnvironmentReply,
  BuildEnvironmentRequest,
} from "../../../proto/dockerGet/dockerGet";
import { grpcClient } from "../../../lib/grpcClient";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentAddResponse>
) {
  var client = grpcClient;
  const { name, section_user_id, containerId, description, sectionId } =
    JSON.parse(req.body);
  const userId = getCookie(req.headers.cookie, "userId");
  var docReq = BuildEnvironmentRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    name: name,
    description: description,
    containerID: containerId,
    sectionUserId: section_user_id,
  });

  try {
    await redisHelper.insert.createEnvironment(sectionId, {
      title: name,
      description: description,
      createdBy: userId,
    });
    client.buildEnvironment(
      docReq,
      function (err, GoLangResponse: AddEnvironmentReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          environmentID: GoLangResponse.environmentID,
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
    await redisHelper.remove.createEnvironment(sectionId, {
      title: name,
      description: description,
      createdBy: userId,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
