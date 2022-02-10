import React, { useEffect, useState } from "react";
import { useCnails } from "../contexts/cnails";
import CoursesList from "../components/index/CoursesList";
import ContainersList from "../components/index/ContainersList";
import { props as CourseListProps } from "../components/index/CoursesList";
import { Props as ContainerListProps } from "../components/index/ContainersList";
import Loader from "../components/Loader";
import { NotificationBody } from "../components/Notification";
import { containerAPI } from "../lib/containerAPI";
import { generalAPI } from "../lib/generalAPI";

export default function Home() {
  // load once when page is rendered
  const [courses, setCourses] = useState<CourseListProps>();
  const [containers, setContainers] = useState<ContainerListProps>();
  const { sub } = useCnails();
  const { containerList } = containerAPI;
  const { courseList } = generalAPI;
  // data fetching from API
  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await courseList(sub);
      setCourses(courses);
    };
    const fetchContainers = async () => {
      const containers = await containerList(sub);
      setContainers(containers);
    };
    fetchCourses();
    fetchContainers();
  }, []);
  console.log(containers);
  return (
    <>
      {courses && containers ? (
        <div className="flex flex-col mx-6">
          <ContainersList
            containers={containers!.containers}
            containerInfo={containers!.containersInfo}
          ></ContainersList>
          <CoursesList courses={courses!.courses}></CoursesList>
        </div>
      ) : (
        <div className="flex h-screen w-full">
          <div className="m-auto">
            <Loader></Loader>
          </div>
        </div>
      )}
    </>
  );
}
