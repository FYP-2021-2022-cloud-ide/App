// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { TemplateListResponse } from "../../../lib/api/api";
import { fetchAppSession } from "../../../lib/fetchAppSession";

import { grpcClient } from "../../../lib/grpcClient";
import {
  ListTemplatesReply,
  SectionAndSubRequest,
} from "../../../proto/dockerGet/dockerGet_pb";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplateListResponse>
) {
  var client = grpcClient
  var docReq = new SectionAndSubRequest();
  const { sub, sectionid } = req.query;
  docReq.setSessionKey(fetchAppSession(req));
  docReq.setSub(sub as string);
  docReq.setSectionid(sectionid as string);
  try {
    client.listTemplates(
      docReq,
      function (err, GoLangResponse: ListTemplatesReply) {
        var templates = GoLangResponse.getTemplatesList();
        let success = GoLangResponse.getSuccess();
        if (success){
          res.json({
            success: success,
            message: GoLangResponse.getMessage(),
            templates:
              templates.map((t) => {
                return {
                  id: t.getId(),
                  name: t.getName(),
                  description: t.getDescription(),
                  imageId: t.getImageid(),
                  environment_id:t.getEnvironmentId(),
                  assignment_config_id: t.getAssignmentConfigId(),
                  storage: t.getStorage(),
                  active: t.getActive(),
                  isExam: t.getIsExam(),
                  timeLimit: t.getTimeLimit(),
                  allow_notification: t.getAllowNotification(),
                  containerID: t.getContaineridList()[0],
                };
              }) || [],
          }); }
        else {
          throw new Error("internal server error " +GoLangResponse.getMessage() );
        }
        res.status(200).end();
      }
    );
  } catch (error) {
    res.json({
      success: false,
      message: error
    });
    res.status(405).end();
  }
}
