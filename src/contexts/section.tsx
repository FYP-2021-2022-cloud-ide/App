import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import Loader from "../components/Loader";
import { generalAPI } from "../lib/api/generalAPI";
import { SectionRole, SectionUserInfo } from "../lib/cnails";
import { errorToToastDescription } from "../lib/errorHelper";
import { useCnails } from "./cnails";

type SectionContextState = {
  sectionUserInfo: SectionUserInfo;
};

const SectionContext = createContext({} as SectionContextState);

export const useSection = () => useContext(SectionContext);

export const SectionProvider = ({ children }: { children: JSX.Element }) => {
  const { sub } = useCnails();
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>();
  const fetchSectionUserInfo = async (sectionId: string, sub: string) => {
    const response = await generalAPI.getSectionUserInfo(sectionId, sub); //
    if (response.success) {
      const { courseName, role, sectionUserID } = response;
      const sectionUserInfo: SectionUserInfo = {
        courseCode: courseName.split(" ")[0],
        sectionCode: /\((.*?)\)/.exec(courseName)[1],
        role: role.toUpperCase() as SectionRole,
        sectionId: sectionId,
        sectionUserId: sectionUserID,
        sub: sub,
      };
      setSectionUserInfo(sectionUserInfo);
      return sectionUserInfo;
    } else {
      myToast.error({
        title: "Fail to get section information",
        description: errorToToastDescription(response.error),
      });
      router.push("/");
    }
  };

  useEffect(() => {
    fetchSectionUserInfo(sectionId, sub);
  }, []);

  if (!sectionUserInfo) return <Loader />;

  return (
    <SectionContext.Provider
      value={{
        sectionUserInfo,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
