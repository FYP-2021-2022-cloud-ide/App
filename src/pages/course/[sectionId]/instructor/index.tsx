import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../../components/Loader";
import { generalAPI } from "../../../../lib/api/generalAPI";
import {
  SectionUserInfo,
  SectionRole,
} from "../../../../lib/cnails";
import myToast from "../../../../components/CustomToast";
import ModalForm from "../../../../components/ModalForm/ModalForm";
import CourseBar from "../../../../components/CourseBar";
import Breadcrumbs from "../../../../components/Breadcrumbs";

import _ from "lodash";
import courseAPI from "../../../../lib/api/courses";
import CardMenu from "../../../../components/CardMenu";
import { errorToToastDescription } from "../../../../lib/errorHelper";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../../../../lib/constants";
import { InstructorProvider } from "../../../../contexts/instructor";
import EnvironmentTemplateWrapper from "../../../../components/EnvironmentTemplateWrapper";
import getAnnouncementFormStructure, { AnnouncementFormData } from "../../../../lib/forms/announmentForm";


const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  // data fetching from API
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>(null);
  const [announceFormOpen, setAnnounceFormOpen] = useState<boolean>(false);
  const { getSectionUserInfo } = generalAPI;
  const { sub, userId } = useCnails();
  const fetchSectionUserInfo = async () => {
    const response = await getSectionUserInfo(sectionId, sub);

    if (response.success) {
      const { courseName, role, sectionUserID } = response;
      setSectionUserInfo({
        courseCode: courseName.split(" ")[0],
        sectionCode: /\((.*?)\)/.exec(courseName)[1],
        role: role.toUpperCase() as SectionRole,
        sectionId: sectionId,
        sectionUserId: sectionUserID,
        sub: sub,
      });
    } else {
      myToast.error({
        title: "Fail to get section information",
        description: errorToToastDescription(response.error),
        comment: CLICK_TO_REPORT,
      });
      router.push("/");
    }
  };
  useEffect(() => {
    fetchSectionUserInfo();
  }, []);

  // if the section user info is not set, don't need to go
  // if (!sectionUserInfo) return <></>;

  return (
    <div className="w-full">
      {sectionUserInfo ? (
        <div className="flex flex-col  px-8 w-full space-y-4">
          <Breadcrumbs
            elements={[
              {
                name: "Dashboard",
                path: "/",
              },
              {
                name: `${sectionUserInfo.courseCode} (${sectionUserInfo.sectionCode})`,
                path: `/course/${sectionId}/instructor`,
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
          <InstructorProvider sectionUserInfo={sectionUserInfo}>
            <EnvironmentTemplateWrapper></EnvironmentTemplateWrapper>
          </InstructorProvider>
        </div>
      ) : (
        <Loader />
      )}
      <ModalForm
        isOpen={announceFormOpen}
        setOpen={setAnnounceFormOpen}
        title={"Course Annoucement"}
        size="lg"
        formStructure={getAnnouncementFormStructure()}
        clickOutsideToClose
        escToClose
        onEnter={async ({ course_announcement: data }: AnnouncementFormData) => {
          console.log(data);
          const response = await courseAPI.sendNotificationAnnouncement(
            data.allow_reply,
            data.announcement,
            data.title,
            userId,
            sectionId
          );
          if (response.success)
            myToast.success("The course announcement is sent.");
          else
            myToast.error({
              title: "Fail to send course announcement",
              description: errorToToastDescription(response.error),
              comment: CLICK_TO_REPORT,
            });
          setAnnounceFormOpen(false);
        }}
        onClose={() => {
          setAnnounceFormOpen(false);
        }}
      ></ModalForm>
    </div>
  );
};
export default Home;
