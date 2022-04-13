import React, { useState } from "react";
import CourseBar from "../../../../components/CourseBar";
import Breadcrumbs from "../../../../components/Breadcrumbs";

import _ from "lodash";
import CardMenu from "../../../../components/CardMenu";
import {
  InstructorProvider,
  useInstructor,
} from "../../../../contexts/instructor";
import EnvironmentTemplateWrapper from "../../../../components/EnvironmentTemplateWrapper";
import AnnouncementForm from "../../../../components/forms/AnnouncementForm";
import { SectionProvider } from "../../../../contexts/section";

const Wrapper = () => {
  // data fetching from API
  const { sectionUserInfo } = useInstructor();
  const [announceFormOpen, setAnnounceFormOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      <div className="flex flex-col  px-8 w-full space-y-4">
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
        <EnvironmentTemplateWrapper></EnvironmentTemplateWrapper>
      </div>
      <AnnouncementForm
        isOpen={announceFormOpen}
        setOpen={setAnnounceFormOpen}
      />
    </div>
  );
};

const Home = () => {
  return (
    <SectionProvider>
      <InstructorProvider>
        <Wrapper></Wrapper>
      </InstructorProvider>
    </SectionProvider>
  );
};

export default Home;
