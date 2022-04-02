// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { EnvironmentListResponse, nodeError } from "../../../lib/api/api";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { grpcClient } from "../../../lib/grpcClient";

import {
  ListEnvironmentsReply,
  SectionAndSubRequest,
} from "../../../proto/dockerGet/dockerGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentListResponse>
) {
  const { sectionid, sub } = req.query;
  var docReq = SectionAndSubRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sectionID: sectionid as string,
    sub: sub as string,
  });

  try {
    grpcClient.listEnvironments(
      docReq,
      async function (err, GoLangResponse: ListEnvironmentsReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          environments: GoLangResponse.environments,
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
