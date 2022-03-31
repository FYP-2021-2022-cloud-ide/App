// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { SuccessStringResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  TemplateIdRequest,
} from "../../../proto/dockerGet/dockerGet";
import { getCookie } from "../../../lib/cookiesHelper";
import redisHelper from "../../../lib/redisHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  const { templateId, section_user_id, sectionId, title, description } =
    JSON.parse(req.body);
  const userId = getCookie(req.headers.cookie, "userId");
  var docReq = TemplateIdRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    templateID: templateId,
    sectionUserId: section_user_id,
  });
  try {
    await redisHelper.insert.updateTemplate(sectionId, {
      title: title,
      description: description,
      updatedBy: userId,
      id: templateId,
    });
    grpcClient.deactivateTemplate(
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
  } finally {
    await redisHelper.remove.updateTemplate(sectionId, {
      title: title,
      description: description,
      updatedBy: userId,
      id: templateId,
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
