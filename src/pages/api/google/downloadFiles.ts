import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";
import {
  SuccessStringReply,
  DownloadRequest,
} from "../../../proto/dockerGet/dockerGet";
const DOWNLOAD_DIR = "/tmp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { sub, fileId, fileName, filePath, fileType } = JSON.parse(req.body);
  var client = grpcClient;
  var docReq = DownloadRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sub: sub,
    fileId: fileId,
    fileName: fileName,
    filePath: filePath,
    fileType: fileType,
  });
  try {
    client.googleDownloadFiles(
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