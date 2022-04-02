// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import {
  TemplateGetStudentWorkspaceResponse,
  nodeError,
  GetTemplateStudentWorkspaceRequest,
} from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  TemplateGetStudentWorkspaceReply,
  TemplateIdRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplateGetStudentWorkspaceResponse>
) {
  const { templateId, section_user_id } = JSON.parse(
    req.body
  ) as GetTemplateStudentWorkspaceRequest;
  // console.log(templateId, section_user_id)
  var docReq = TemplateIdRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    templateID: templateId,
    sectionUserId: section_user_id,
  });
  try {
    grpcClient.getTemplateStudentWorkspace(
      docReq,
      function (err, GoLangResponse: TemplateGetStudentWorkspaceReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          studentWorkspaces: GoLangResponse.StudentWorkspaces.map((s) => {
            return {
              status: s.status,
              workspaceId: s.workspaceId,
              student: {
                name: s.student.name,
                sub: s.student.sub,
                userId: s.student.userId,
              },
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
