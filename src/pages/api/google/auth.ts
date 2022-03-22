// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import { GoogleOAuthReponse, nodeError } from "../../../lib/api/api";
import {
  GoogleOAuthReply,
  EmptyRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoogleOAuthReponse>
) {
  var docReq = EmptyRequest.fromPartial({
    sessionKey: fetchAppSession(req),
  });
  var client = grpcClient;
  try {
    client.googleOAuth(
      docReq,
      function (err, GoLangResponse: GoogleOAuthReply) {
        console.log(err);
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          authURL: GoLangResponse.authURL,
        });
      }
    );
  } catch (error) {
    res.status(405).json({
      success: false,
      error: nodeError(error),
    });
  }
}
