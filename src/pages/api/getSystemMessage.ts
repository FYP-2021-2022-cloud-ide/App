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
      id: "00003",
      text: "The instructor page under maintained. The personal workspace part should be the most stable.",
    },
  });
  res.status(200).end();
}

export const config = {
  api: {
    externalResolver: true,
  },
};
