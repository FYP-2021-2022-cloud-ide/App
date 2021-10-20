// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message: string
  courses: Course[]
  //cutMes: string[]
}

type Course = {
  sectionID: string
  courseCode: string
  section: string
  name: string
  sectionRole: string
  lastUpdateTime: string
}

import * as grpc from 'grpc';

import {  ListCoursesReply,  SubRequest } from '../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../proto/dockerGet/dockerGet_grpc_pb';

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
      client.listCourses(docReq, function(err, GoLangResponse: ListCoursesReply) {
        //console.log(mes)
        var courses = GoLangResponse.getCoursesList();
        res.json({
          success: GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          courses: courses.map( course =>{
            return ({
              sectionID: course.getSectionid(),
              courseCode: course.getCoursecode(),
              section: course.getSection(),
              name: course.getName(),
              sectionRole: course.getSectionrole(),
              lastUpdateTime: course.getLastupdatetime()
            })
          })
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