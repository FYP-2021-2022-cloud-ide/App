// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../lib/api/api";

import { grpcClient } from "../../lib/grpcClient";
import {
  SuccessStringReply,
  UpdateUserDataRequest,
} from "../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  console.log("in1");
  console.log(req.body);
  var client = grpcClient;
  const { sub, darkMode, bio } = JSON.parse(req.body);

  var docReq: UpdateUserDataRequest = UpdateUserDataRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sub: sub as string,
    darkMode: darkMode,
    bio: bio,
  });

  try {
    client.updateUserData(
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