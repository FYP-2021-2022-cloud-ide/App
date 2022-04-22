// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../../lib/fetchAppSession";
import { grpcClient } from "../../../lib/grpcClient";
import {
  ListContainerReply,
  ListContainerReply_Container_containerType,
  listContainerReply_Container_containerTypeToJSON,
} from "../../../proto/dockerGet/dockerGet";
// const { ListContainerReply, SubRequest } = dockerGet_pb;
import {
  ContainerListResponse,
  nodeError,
  ContainerType,
} from "../../../lib/api/api";
import redisHelper from "../../../lib/redisHelper";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerListResponse>
) {
  try {
    const { sub } = req.query;
    grpcClient.listAllContainers(
      {
        sessionKey: fetchAppSession(req),
        sub: sub as string,
      },
      async function (err, GoLangResponse: ListContainerReply) {
        // console.log(GoLangResponse.containerInfo == undefined);
        var containersInfo = GoLangResponse.containerInfo;
        var containers = GoLangResponse.containers;
        // console.log(containers);
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

          containers: await redisHelper.patch.workspaces(
            sub as string,
            containers.map((container) => {
              return {
                title: container.title,
                subTitle: container.subTitle,
                startAt: container.existedTime,
                containerId: container.containerID,
                type:
                  (container.type ==
                    ListContainerReply_Container_containerType.SANDBOX &&
                    "SANDBOX") ||
                  (container.type ==
                    ListContainerReply_Container_containerType.TEMPLATE_WORKSPACE &&
                    "TEMPLATE") ||
                  undefined,
                sourceId: "",
                isTemporary:
                  container.type ==
                  ListContainerReply_Container_containerType.TEMPORARY,
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
