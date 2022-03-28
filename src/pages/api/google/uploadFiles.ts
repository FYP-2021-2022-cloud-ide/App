import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import type { NextApiRequest, NextApiResponse } from "next";
import { SuccessStringResponse, nodeError } from "../../../lib/api/api";
import {
  SuccessStringReply,
  UploadRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { sub, filePath, parentId, fileType } = JSON.parse(req.body);
  var client = grpcClient;
  var docReq = UploadRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sub: sub,
    filePath: filePath,
    parentId: parentId,
    fileType: fileType,
  });

  try {
    client.googleUploadFiles(
      docReq,
      (error, GoLangResponse: SuccessStringReply) => {
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