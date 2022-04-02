// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { TemplateListResponse, nodeError } from "../../../lib/api/api";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { grpcClient } from "../../../lib/grpcClient";
import {
  ListTemplatesReply,
  SectionAndSubRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplateListResponse>
) {
  const { sub, sectionid } = req.query;
  var docReq = SectionAndSubRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sub: sub as string,
    sectionID: sectionid as string,
  });

  try {
    grpcClient.listTemplates(
      docReq,
      function (err, GoLangResponse: ListTemplatesReply) {
        var templates = GoLangResponse.templates;
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          templates: templates.map((t) => {
            return {
              id: t.id,
              name: t.name,
              description: t.description,
              imageId: t.imageId,
              environment_id: t.environmentId,
              assignment_config_id: t.assignmentConfigId,
              storage: t.storage,
              active: t.active,
              isExam: t.isExam,
              timeLimit: t.timeLimit,
              allow_notification: t.allowNotification,
              containerID: t.ContainerId[0],
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
