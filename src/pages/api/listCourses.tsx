// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../lib/fetchAppSession";

import { CourseListResponse ,nodeError} from "../../lib/api/api";

import { grpcClient } from "../../lib/grpcClient";
import {
  ListCoursesReply,
  SubRequest,
} from "../../proto/dockerGet/dockerGet_pb";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseListResponse>
) {
  var client = grpcClient
  const { sub } = req.query;

  var docReq = new SubRequest();
  docReq.setSessionKey(fetchAppSession(req));
  docReq.setSub(sub as string);
  try {
    client.listCourses(
      docReq,
      function (err, GoLangResponse: ListCoursesReply) {

        var courses = GoLangResponse.getCoursesList();
        res.json({
          success: GoLangResponse.getSuccess(),
          error:{
              status: GoLangResponse.getError().getStatus(),
              error: GoLangResponse.getError().getError(),
          } ,
          courses:
            courses.map((course) => {
              return {
                sectionID: course.getSectionid(),
                courseCode: course.getCoursecode(),
                section: course.getSection(),
                name: course.getName(),
                sectionRole: course.getSectionrole() as
                  | "instructor"
                  | "student",
                lastUpdateTime: course.getLastupdatetime(),
              };
            }) || [],
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    res.json({
      success: false,
      error:nodeError(error) ,
    });
    res.status(405).end();
  }
}
