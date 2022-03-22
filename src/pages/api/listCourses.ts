// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAppSession } from "../../lib/fetchAppSession";

import { CourseListResponse, nodeError } from "../../lib/api/api";

import { grpcClient } from "../../lib/grpcClient";
import { ListCoursesReply, SubRequest } from "../../proto/dockerGet/dockerGet";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseListResponse>
) {
  var client = grpcClient;
  const { sub } = req.query;

  var docReq: SubRequest = SubRequest.fromPartial({
    sessionKey: fetchAppSession(req),
    sub: sub as string,
  });
  try {
    client.listCourses(
      docReq,
      function (err, GoLangResponse: ListCoursesReply) {
        var courses = GoLangResponse.courses;
        res.json({
          success: GoLangResponse.success,
          error: {
            status: GoLangResponse.error?.status,
            error: GoLangResponse.error?.error,
          },
          courses:
            courses.map((course) => {
              return {
                sectionID: course.sectionID,
                courseCode: course.courseCode,
                section: course.section,
                name: course.name,
                sectionRole: course.sectionRole as "instructor" | "student",
                lastUpdateTime: course.lastUpdateTime,
              };
            }) || [],
        });
        res.status(200).end();
      }
    );
  } catch (error) {
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }
}
