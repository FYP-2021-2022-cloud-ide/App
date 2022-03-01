// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchAppSession } from '../../../lib/fetchAppSession';
import { SuccessStringResponse } from "../../../lib/api/api";

import { grpcClient } from "../../../lib/grpcClient";
import {
  SuccessStringReply,
  UpdateSubscriptionRequest,
} from "../../../proto/dockerGet/dockerGet_pb";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
) {
  var client = grpcClient
  const { semesterId, registrationToken, userId } = JSON.parse(req.body);
  console.log(req.body);
  var docReq = new UpdateSubscriptionRequest();
  
  docReq.setSessionKey(fetchAppSession(req));
  docReq.setSemesterid(semesterId);
  docReq.setToken(registrationToken);
  docReq.setUserid(userId);
  try {
    client.updateSubscription(
      docReq,
      function (err, GoLangResponse: SuccessStringReply) {
        console.log(GoLangResponse);
        if (!GoLangResponse.getSuccess()) {
          console.log(GoLangResponse.getMessage());
        }
        res.json({
          success: GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    res.status(405).end();
  }
}
