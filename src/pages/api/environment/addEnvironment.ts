// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import { EnvironmentAddResponse, nodeError } from "../../../lib/api/api";

import {
  AddEnvironmentReply,
  AddEnvironmentRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentAddResponse>
) {
  const { libraries, name, section_user_id, description, sectionId } =
    JSON.parse(req.body);
  const userId = getCookie(req.headers.cookie, "userId");
  var docReq = AddEnvironmentRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    libraries: libraries,
    name: name,
    sectionUserId: section_user_id,
    description: description,
  });
  try {
    await redisHelper.insert.createEnvironment(sectionId, {
      title: name,
      description: description,
      createdBy: userId,
    });
    grpcClient.addEnvironment(
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
