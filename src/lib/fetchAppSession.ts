import type { NextApiRequest } from 'next'
import crypto from "crypto";
import {parse} from 'cookie'
type fetchAppSession=()=>string;
const fetchAppSession=(req:NextApiRequest)=>{
    const {appSession} = parse(req.headers.cookie!)
    const key = crypto.createHmac('sha1', process.env.SESSIONSECRET!).update(appSession).digest().toString('base64');
    return key
}


export {fetchAppSession}