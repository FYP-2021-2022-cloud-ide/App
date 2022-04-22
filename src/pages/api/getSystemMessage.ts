// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from "next";
import { SystemMessageResponse } from "../../lib/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SystemMessageResponse>
) {
  res.json({
    success: true,
    systemMessage: {
      id: "00005",
      text: "Cards UI logic is being optimized...",
    },
  });
  res.status(200).end();
}

export const config = {
  api: {
    externalResolver: true,
  },
};
