// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { NotificationSendResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SendNotificationReply,
  SendNotificationRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationSendResponse>
) {
  var client = grpcClient;
  const { title, body, sender, receiver, allowReply,sectionId } = JSON.parse(req.body);
  var docReq = SendNotificationRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    title: title,
    body: body,
    sender: sender,
    receiver: receiver,
    allowReply: allowReply,
    sectionId:sectionId,
  });
  try {
    client.sendNotification(
      docReq,
      function (err, GoLangResponse: SendNotificationReply) {
        console.log(GoLangResponse);
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          notificationId: GoLangResponse.notificationId,
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