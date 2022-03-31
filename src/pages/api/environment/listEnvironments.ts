// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { EnvironmentListResponse, nodeError } from "../../../lib/api/api";
import { getCookie } from "../../../lib/cookiesHelper";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { grpcClient } from "../../../lib/grpcClient";
import redisHelper from "../../../lib/redisHelper";
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
  const userId = getCookie(req.headers.cookie, "userId");
  var docReq = SectionAndSubRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sectionID: sectionid as string,
    sub: sub as string,
  });

  try {
    client.listEnvironments(
      docReq,
      async function (err, GoLangResponse: ListEnvironmentsReply) {
        var envs = GoLangResponse.environments;
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          environments: await redisHelper.patch.environments(
            sectionid as string,
            envs.map((env) => {
              return {
                id: env.id,
                imageId: env.imageId,
                environmentName: env.environmentName,
                libraries: env.libraries,
                description: env.description,
              };
            })
          ),
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
