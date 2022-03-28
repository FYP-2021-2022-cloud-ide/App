import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";

import { GoogleDriveListResponse, nodeError } from "../../../lib/api/api";
import {
  ChildrenReply,
  ListFilesRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoogleDriveListResponse>
) {
  console.log("inside list file");
  const { folderId, sub } = JSON.parse(req.body);
  var client = grpcClient;
  var docReq = ListFilesRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    folderId: folderId,
    sub: sub,
  });
  try {
    client.googleListFile(docReq, (error, GoLangResponse: ChildrenReply) => {
      // console.log(GoLangResponse.getFoldersList())
      res.json({
        success: GoLangResponse.success,
        error: {
          status: GoLangResponse.error?.status,
          error: GoLangResponse.error?.error,
        },
        loadedFiles: {
          folders:
            GoLangResponse.folders.map((folder) => ({
              id: folder.id,
              name: folder.name,
            })) || [],
          files:
            GoLangResponse.files.map((file) => ({
              id: file.id,
              name: file.name,
            })) || [],
        },
      });

      res.status(200).end();
    });
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