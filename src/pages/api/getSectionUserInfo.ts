// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../lib/fetchAppSession";

import {
  SectionUserInfoResponse,
  SectionRole,
  nodeError,
} from "../../lib/api/api";

import { grpcClient } from "../../lib/grpcClient";
import {
  GetSectionInfoReply,
  SectionAndSubRequest,
} from "../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SectionUserInfoResponse>
) {
  var client = grpcClient;
  const { sectionid, sub } = req.query;
  var docReq: SectionAndSubRequest = {
    sessionKey: fetchAppSession(req),
    sub: sub as string,
    sectionID: sectionid as string,
  };
  try {
    client.getSectionInfo(
      docReq,
      function (err, GoLangResponse: GetSectionInfoReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          sectionUserID: GoLangResponse.sectionUserID,
          courseName: GoLangResponse.courseName,
          role: GoLangResponse.role as SectionRole,
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