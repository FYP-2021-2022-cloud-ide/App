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
  var client = grpcClient;
  const { sectionid, sub } = req.query;

  var docReq = SectionAndSubRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sectionID: sectionid as string,
    sub: sub as string,
  });

  try {
    client.listEnvironments(
      docReq,
      function (err, GoLangResponse: ListEnvironmentsReply) {
        var envs = GoLangResponse.environments;
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          environments:
            envs.map((env) => {
              return {
                id: env.id,
                imageId: env.imageId,
                environmentName: env.environmentName,
                libraries: env.libraries,
                description: env.description,
              };
            }) || [],
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