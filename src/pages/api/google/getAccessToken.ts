import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";
import {
  SuccessStringReply,
  CodeRequest,
} from "../../../proto/dockerGet/dockerGet";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { code, sub } = JSON.parse(req.body);
  var client = grpcClient;
  var docReq = CodeRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    code: code,
    sub: sub,
  });
  try {
    client.requestAccessToken(
      docReq,
      (error, GoLangResponse: SuccessStringReply) => {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
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

export const config = {
  api: {
    externalResolver: true
  }
}