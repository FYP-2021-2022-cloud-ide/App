import React from "react";
import Link from "next/link";
import moment from "moment";
import Tilt from "react-parallax-tilt";
import { Course } from "../lib/cnails";
import useCleanTilt from "./useCleanTilt";

export interface CourseProps {
  link: string;
  course: Course;
  zIndex?: number;
}

function CourseCard({ link, course, zIndex }: CourseProps) {
  const badgeClass = course.sectionRole.toLocaleLowerCase() + "-badge";
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
                <b className="course-card-title">
                  {`${course.courseCode} (${course.section})`}
                </b>
                <div className="course-card-name ">{course.name}</div>
                <p className={badgeClass}>{course.sectionRole}</p>
              </div>

              <p className="course-card-last-update">
                {`Last update: ${moment(course.lastUpdateTime).format("YYYY-MM-DD")}`}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </Tilt>
  );
}

export default CourseCard;
