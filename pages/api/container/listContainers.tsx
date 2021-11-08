// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  containersInfo: ContainerInfo
  containers: Container []
  tempContainers:Container []
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

import * as grpc from 'grpc';

import {  ListContainerReply,  SubRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());

    var body = JSON.parse(req.body);
    var docReq = new SubRequest();
    docReq.setSub(body.sub);
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