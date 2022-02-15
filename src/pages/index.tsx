import React, { useEffect, useState } from "react";
import { useCnails } from "../contexts/cnails";
import CoursesList from "../components/index/CoursesList";
import ContainersList from "../components/index/ContainersList";
import Loader from "../components/Loader";
import { containerAPI } from "../lib/api/containerAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { Course, Container, ContainerInfo } from "../lib/cnails";

export default function Home() {
  // load once when page is rendered
  const [courses, setCourses] = useState<Course[]>();
  const { sub, containers, containerInfo } = useCnails();
  const { courseList } = generalAPI;
  // data fetching from API
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await courseList(sub);
      if (response.success) {
        const courses = response.courses.map((course) =>
          Object.assign(
            {},
            {
              ...course,
              sectionRole: course.sectionRole.toUpperCase() as
                | "INSTRUCTOR"
                | "STUDENT",
            }
          )
        );
        setCourses(courses);
      }
    };
    fetchCourses();
  }, []);
  console.log(containerInfo);
  return (
    <>
      {courses && containers && containerInfo ? (
        <div className="flex flex-col mx-6">
          <ContainersList
            containers={containers}
            containerInfo={containerInfo}
          ></ContainersList>
          <CoursesList courses={courses}></CoursesList>
        </div>
      ) : (
        <div className="flex h-screen w-full ">
          <div className="m-auto">
            <Loader></Loader>
          </div>
        </div>
      )}
    </>
  );
}
