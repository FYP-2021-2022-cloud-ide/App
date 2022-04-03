// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { NotificationListResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  ListNotificationsReply,
  UserIdRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationListResponse>
) {
  var client = grpcClient;
  const { userId } = req.query!;
  var docReq: UserIdRequest = UserIdRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    userId: userId as string,
  });
  try {
    client.listNotifications(
      docReq,
      function (err, GoLangResponse: ListNotificationsReply) {
        var nts = GoLangResponse.notifications;
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          notifications: nts.map((nt) => {
            var sender = nt.sender;
            return {
              id: nt.id,
              title: nt.title,
              body: nt.body,
              sender: {
                id: sender!.id,
                sub: sender!.sub,
                name: sender!.name,
              },
              allow_reply: nt.allowReply,
              read: nt.read,
              courseCode: nt.courseCode,
              sectionCode: nt.sectionCode,
              section_id: nt.sectionId,
              sentAt: nt.sentAt,
            };
          }),
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
