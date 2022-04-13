import React from "react";
import Link from "next/link";
import moment from "moment";
import Tilt from "react-parallax-tilt";
import { Course } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";

export interface CourseProps {
  link: string;
  course: Course;
  zIndex?: number;
}

function CourseCard({ link, course, zIndex }: CourseProps) {
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  return (
    <Tilt
      tiltReverse
      tiltMaxAngleY={4}
      tiltMaxAngleX={4}
      onLeave={cleanStyle}
      ref={ref}
    >
      <Link href={link}>
        <a className="">
          <div className="course-card ">
            <div className="flex flex-col w-full">
              <div className="flex flex-col items-start space-y-2 mb-3 ">
                <p id="course-code">{`${course.courseCode} (${course.section})`}</p>
                <p id="course-name">{course.name}</p>
                <p
                  className={
                    course.sectionRole.toLocaleLowerCase() == "instructor"
                      ? "instructor-badge"
                      : "student-badge"
                  }
                >
                  {course.sectionRole}
                </p>
              </div>

              <p id="update-time">
                {`Last update: ${moment(course.lastUpdateTime).format(
                  "YYYY-MM-DD"
                )}`}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </Tilt>
  );
}

export default CourseCard;
