// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message: string
  courses: Course[] | null
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

import {grpcClient}from '../../lib/grpcClient'
import {  ListCoursesReply,  SubRequest } from '../../proto/dockerGet/dockerGet_pb';

function unauthorized(){
  return({
    success: false,
    message: "unauthorized",
    courses: null
  })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    // var body = JSON.parse(req.body);
    const { sub } = req.query;
    // if(sub == undefined){
    //   {res.json(unauthorized());return}
    // }else{
    //   if(sub != req.oidc.user.sub){
    //     res.json(unauthorized())
    //     return;
    //   }
    // }

    var docReq = new SubRequest();
    docReq.setSub(sub as string);
    try{
      client.listCourses(docReq, function(err, GoLangResponse: ListCoursesReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
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