// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { NotificationTokenResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  GetNotificationTokenReply,
  SubRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationTokenResponse>
) {
  var client = grpcClient;

  var body = JSON.parse(req.body);
  var docReq: SubRequest = SubRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sub: body.sub,
  });
  try {
    client.getNotificationToken(
      docReq,
      function (err, GoLangResponse: GetNotificationTokenReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          notification_token: GoLangResponse.notificationToken,
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
