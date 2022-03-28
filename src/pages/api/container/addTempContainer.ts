// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { ContainerAddResponse, nodeError } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  AddTempContainerReply,
  AddTempContainerRequest,
} from "../../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerAddResponse>
) {
  var client = grpcClient;

  const { sub } = req.query;
  const { memLimit, numCPU, imageName, accessRight } = JSON.parse(req.body);
  var docReq: AddTempContainerRequest = AddTempContainerRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    accessRight: accessRight,
    memLimit: memLimit,
    numCPU: numCPU,
    imageName: imageName,
    sub: sub as string,
  });
  try {
    client.addTempContainer(
      docReq,
      function (err, GoLangResponse: AddTempContainerReply) {
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          containerID: GoLangResponse.tempContainerId,
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