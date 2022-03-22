// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import { EnvironmentAddResponse, nodeError } from "../../../lib/api/api";

import {
  AddEnvironmentReply,
  AddEnvironmentRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentAddResponse>
) {
  var client = grpcClient;
  const { libraries, name, section_user_id, description } = JSON.parse(
    req.body
  );

  var docReq = AddEnvironmentRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    libraries: libraries,
    name: name,
    sectionUserId: section_user_id,
    description: description,
  });
  try {
    client.addEnvironment(
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
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }
}
