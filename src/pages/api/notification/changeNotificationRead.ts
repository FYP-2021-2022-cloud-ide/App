// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  ChangeNotificationReadRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  var client = grpcClient;
  const { userId, notificationIds ,read} = JSON.parse(req.body);
  // console.log(notificationIds)
  var docReq = ChangeNotificationReadRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    userId: userId,
    read: read,
  });
  notificationIds.forEach((element: string) => {
    docReq.notificationId.push(element);
  });

  try {
    client.changeNotificationRead(
      docReq,
      function (err, GoLangResponse: SuccessStringReply) {
        console.log(GoLangResponse);
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