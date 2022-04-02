// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import {
  EnvironmentAddRequest,
  EnvironmentAddResponse,
  nodeError,
} from "../../../lib/api/api";

import {
  AddEnvironmentReply,
  AddEnvironmentRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentAddResponse>
) {
  const { libraries, name, section_user_id, description } = JSON.parse(
    req.body
  ) as EnvironmentAddRequest;
  const userId = getCookie(req.headers.cookie, "userId");
  var docReq = AddEnvironmentRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    libraries: libraries,
    name: name,
    sectionUserId: section_user_id,
    description: description,
  });
  try {
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
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
