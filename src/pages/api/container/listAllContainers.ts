// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";
import {
  ListContainerReply,
  listContainerReply_Container_containerTypeToJSON,
} from "../../../proto/dockerGet/dockerGet";
// const { ListContainerReply, SubRequest } = dockerGet_pb;
import { ContainerListResponse, nodeError,ContainerType } from "../../../lib/api/api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerListResponse>
) {
  var client = grpcClient;
  const { sub } = req.query;

  try {
    client.listAllContainers(
      {
        sessionKey: fetchAppSession(req),
        sub: sub as string,
      },
      function (err, GoLangResponse: ListContainerReply) {
        // console.log(GoLangResponse.containerInfo == undefined);
        var containersInfo = GoLangResponse.containerInfo;
        var containers = GoLangResponse.containers;
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
              // console.log(listContainerReply_Container_containerTypeToJSON(containers.type))
              return {
                title: containers.title,
                subTitle: containers.subTitle,
                existedTime: containers.existedTime,
                containerID: containers.containerID,
                type: listContainerReply_Container_containerTypeToJSON(containers.type) as ContainerType,
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
