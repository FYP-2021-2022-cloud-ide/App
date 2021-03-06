import React, { useState } from "react";
import CourseBar from "../../../../components/CourseBar";
import Breadcrumbs from "../../../../components/Breadcrumbs";

import _ from "lodash";
import CardMenu from "../../../../components/CardMenu";
import {
  InstructorProvider,
  useInstructor,
} from "../../../../contexts/instructor";
import AnnouncementForm from "../../../../components/forms/AnnouncementForm";
import { SectionProvider } from "../../../../contexts/section";
import EnvironmentList from "../../../../components/EnvironmentList";
import TemplateList from "../../../../components/TemplateList";

const Wrapper = () => {
  // data fetching from API
  const { sectionUserInfo } = useInstructor();
  const [announceFormOpen, setAnnounceFormOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col  px-8 w-full space-y-4 mb-10 mt-5">
        <Breadcrumbs
          elements={[
            {
              name: "Dashboard",
              path: "/",
            },
            {
              name: `${sectionUserInfo.courseCode} (${sectionUserInfo.sectionCode})`,
              path: `/course/${sectionUserInfo.sectionId}/instructor`,
            },
          ]}
        />
        <div className="flex flex-row justify-between space-x-2 z-[2]">
          <CourseBar
            role="INSTRUCTOR"
            courseCode={sectionUserInfo.courseCode}
            courseTitle={sectionUserInfo.courseTitle}
            sectionCode={sectionUserInfo.sectionCode}
          />
          <CardMenu
            items={[
              {
                text: "Make announcement",
                onClick: () => {
                  setAnnounceFormOpen(true);
                },
              },
            ]}
          ></CardMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
          <EnvironmentList />
          <TemplateList />
        </div>
      </div>
      <AnnouncementForm
        isOpen={announceFormOpen}
        setOpen={setAnnounceFormOpen}
      />
    </>
  );
};

const Home = () => {
  return (
    <SectionProvider>
      <InstructorProvider>
        <Wrapper />
      </InstructorProvider>
    </SectionProvider>
  );
};

export default Home;
