// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";
import {
  ListContainerReply,
  SubRequest,
} from "../../../proto/dockerGet/dockerGet";
// const { ListContainerReply, SubRequest } = dockerGet_pb;
import { ContainerListResponse, nodeError } from "../../../lib/api/api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerListResponse>
) {
  var client = grpcClient;
  const { sub } = req.query;

  try {
    client.listContainers(
      {
        sessionKey: fetchAppSession(req),
        sub: sub as string,
      },
      function (err, GoLangResponse: ListContainerReply) {
        console.log(GoLangResponse.containerInfo == undefined);
        var containersInfo = GoLangResponse.containerInfo;
        var containers = GoLangResponse.containers;
        var tempContainers = GoLangResponse.tempContainers;
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          containersInfo: {
            containersAlive: containersInfo?.containersAlive,
            containersTotal: containersInfo?.containersTotal,
          },
          containers:
            containers.map((containers) => {
              return {
                courseTitle: containers.courseTitle,
                assignmentName: containers.courseTitle,
                existedTime: containers.existedTime,
                containerID: containers.containerID,
              };
            }) || [],
          tempContainers:
            tempContainers.map((containers) => {
              return {
                courseTitle: containers.courseTitle,
                assignmentName: containers.assignmentName,
                existedTime: containers.existedTime,
                containerID: containers.containerID,
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
