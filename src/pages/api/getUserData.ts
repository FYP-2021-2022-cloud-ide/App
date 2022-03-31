// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../lib/fetchAppSession";

import { GetUserDataResponse, nodeError } from "../../lib/api/api";

import { grpcClient } from "../../lib/grpcClient";
import {
  GetUserDataReply,
  GetUserDataRequest,
} from "../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserDataResponse>
) {
  var client = grpcClient;
  const { sub } = req.query;

  var docReq: GetUserDataRequest = GetUserDataRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sub: sub as string,
  });
  // docReq.setSessionKey(fetchAppSession(req));
  // docReq.setSub(sub as string);
  try {
    client.getUserData(
      docReq,
      function (err, GoLangResponse: GetUserDataReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          userId: GoLangResponse.userId,
          role: GoLangResponse.role,
          semesterId: GoLangResponse.semesterId,
          darkMode: GoLangResponse.darkMode,
          bio: GoLangResponse.bio,
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
