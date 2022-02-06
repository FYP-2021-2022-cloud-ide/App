// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'
import {  ListContainerReply,  SubRequest } from '../../../proto/dockerGet/dockerGet_pb';

type Data = {
  success: boolean
  message:string
  containersInfo: ContainerInfo | null
  containers: Container [] | null
  tempContainers:Container [] | null
}

type ContainerInfo = {
  containersAlive: number | undefined
  containersTotal: number | undefined
}

type Container = {
  courseTitle: string
  assignmentName: string
  existedTime: string
  containerID: string
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    const { sub } = req.query;

    var docReq = new SubRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub as string);
    
    try{
      client.listContainers(docReq, function(err, GoLangResponse: ListContainerReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        var containersInfo =GoLangResponse.getContainerinfo();
        var containers = GoLangResponse.getContainersList();
        var tempContainers = GoLangResponse.getTempcontainersList();
        res.json({ 
          success : GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          containersInfo: {
              containersAlive: containersInfo?.getContainersalive(),
              containersTotal: containersInfo?.getContainerstotal(),
          },
          containers: containers.map( containers =>{
            return ({
              courseTitle: containers.getCoursetitle(),
              assignmentName: containers.getAssignmentname(),
              existedTime: containers.getExistedtime(),
              containerID: containers.getContainerid(),
            })
          }),
          tempContainers: tempContainers.map( containers =>{
            return ({
              courseTitle: containers.getCoursetitle(),
              assignmentName: containers.getAssignmentname(),
              existedTime: containers.getExistedtime(),
              containerID: containers.getContainerid(),
            })
          }),
         });
        res.status(200).end();
      })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }