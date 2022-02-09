import React from "react";
import Link from "next/link";
import moment from "moment";
import Tilt from "react-parallax-tilt";

export interface CourseProps {
  link: string;
  course: Course;
}

interface Course {
  sectionID: string;
  courseCode: string;
  section: string;
  name: string;
  sectionRole: string;
  lastUpdateTime: string;
}

function Course({ link, course }: CourseProps) {
  return (
    <>
      <Link href={link}>
        <a className="">
          <Tilt tiltReverse tiltMaxAngleY={4} tiltMaxAngleX={4}>
            <div className="border broder-gray-200 shadow-sm transition rounded-lg bg-white p-4 dark:bg-gray-600 dark:border-gray-700 ">
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col ">
                    <div className="flex flex-col items-start mb-3 ">
                      <b className="card title">
                        {course.courseCode + " (" + course.section + ")"}
                      </b>
                      <div className="font-medium text-xs text-gray-600 dark:text-gray-400 ">
                        {course.name}
                      </div>
                    </div>
                    {course.sectionRole == "INSTRUCTOR" ? (
                      <div className="badge bg-purple-500 border-purple-500 ">
                        Instructor
                      </div>
                    ) : (
                      <div className="badge bg-blue-500 border-blue-500">
                        Student
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-400 mt-10">
                    Last update:{" "}
                    {moment(course.lastUpdateTime).format("YYYY-MM-DD")}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </a>
      </Link>
    </>
  );
}

export default Course;
