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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  var client = grpcClient;
  const { templateId, section_user_id } = JSON.parse(req.body);

  var docReq = TemplateIdRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    templateID: templateId,
    sectionUserId: section_user_id,
  });
  try {
    client.activateTemplate(
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
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }
}