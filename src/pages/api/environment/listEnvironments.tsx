// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { Environment } from "../../../lib/cnails";
import { fetchAppSession } from "../../../lib/fetchAppSession";

type Data = {
  success: boolean;
  message: string;
  environments: Environment[] | null;
};

import { grpcClient } from "../../../lib/grpcClient";
import {
  ListEnvironmentsReply,
  SectionAndSubRequest,
} from "../../../proto/dockerGet/dockerGet_pb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client = grpcClient();
  const { sectionid, sub } = req.query;

  var docReq = new SectionAndSubRequest();
  docReq.setSessionKey(fetchAppSession(req));
  docReq.setSectionid(sectionid as string);
  docReq.setSub(sub as string);

  try {
    client.listEnvironments(
      docReq,
      function (err, GoLangResponse: ListEnvironmentsReply) {
        var envs = GoLangResponse.getEnvironmentsList();
        if (!GoLangResponse.getSuccess()) {
          console.log(GoLangResponse.getMessage());
        }
        res.json({
          success: GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          environments: envs.map((env) => {
            return {
              id: env.getId(),
              imageId: env.getImageid(),
              environmentName: env.getEnvironmentname(),
              libraries: env.getLibraries(),
              description: env.getDescription(),
            };
          }),
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    //@ts-ignore
    res.json(error);
    res.status(405).end();
  }
}
