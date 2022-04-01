// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  UpdateTemplateRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const {
    templateId,
    templateName,
    section_user_id,
    containerId,
    description,
    isExam,
    timeLimit,
    allow_notification,
  } = JSON.parse(req.body);
  var docReq = UpdateTemplateRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    templateID: templateId,
    name: templateName,
    sectionUserId: section_user_id,
    containerID: containerId,
    description: description,
    isExam: isExam,
    timeLimit: timeLimit,
    allowNotification: allow_notification,
  });
  try {
    grpcClient.updateTemplate(
      docReq,
      function (err, GoLangResponse: SuccessStringReply) {
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
