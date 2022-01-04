// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next'

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  console.log('inisde auth')
  const {credentials} = JSON.parse(req.body)
  const {client_secret, client_id, redirect_uris} = credentials;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
  });
  // window.location(authUrl)
  res.status(200).json({ url: authUrl })
}
