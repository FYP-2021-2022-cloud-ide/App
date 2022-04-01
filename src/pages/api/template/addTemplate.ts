// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { TemplateAddResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  AddTemplateReply,
  AddTemplateRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplateAddResponse>
) {
  const {
    templateName,
    section_user_id,
    assignment_config_id,
    environment_id,
    containerId,
    description,
    active,
    isExam,
    timeLimit,
    allow_notification,
    sectionId,
  } = JSON.parse(req.body);

  var docReq = AddTemplateRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    name: templateName,
    sectionUserId: section_user_id,
    environmentId: environment_id,
    assignmentConfigId: assignment_config_id,
    containerID: containerId,
    description: description,
    active: active,
    isExam: isExam,
    timeLimit: timeLimit,
    allowNotification: allow_notification,
  });

  try {
    grpcClient.addTemplate(
      docReq,
      function (err, GoLangResponse: AddTemplateReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          templateID: GoLangResponse.templateID,
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
