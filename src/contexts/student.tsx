import React, { createContext, useContext, useEffect, useState } from "react";
import { Container, SectionUserInfo, Workspace } from "../lib/cnails";
import myToast from "../components/CustomToast";
import { TemplateListResponse } from "../lib/api/api";
import { errorToToastDescription } from "../lib/errorHelper";
import {
  patchTemplates,
  apiTemplatesToUiTemplates,
} from "../lib/templateHelper";
import { useSection } from "./section";
import { useContainers } from "./containers";
import { useCancelablePromise } from "../hooks/useCancelablePromise";
import { templateAPI } from "../lib/api/templateAPI";
import { useCnails } from "./cnails";
import Loader from "../components/Loader";

type StudentContextState = {
  sectionUserInfo: SectionUserInfo;
  workspaces: Workspace[];
  getWorkspace: (id: string) => Workspace;
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  fetchWorkspaces: () => Promise<Workspace[]>;
};

const StudentContext = createContext({} as StudentContextState);

export const useStudent = () => useContext(StudentContext);
export const StudentProvider = ({ children }: { children: JSX.Element }) => {
  const { sub } = useCnails();
  const { sectionUserInfo } = useSection();
  const [workspaces, setWorkspaces] = useState<Workspace[]>();
  const { containers } = useContainers();
  const { cancelablePromise } = useCancelablePromise();

  const getWorkspace = (id: string) =>
    workspaces.find((workspace) => workspace.id == id);

  /**
   * this fetch function is exactly the same as the one in instructor but the name is changed to workspaces
   * @param _containers
   * @returns
   */
  const fetchWorkspaces = async (
    _containers: Container[] = containers,
    _sectionUserInfo: SectionUserInfo = sectionUserInfo
  ) => {
    const afterResponse = (
      response: TemplateListResponse,
      mount: boolean = true
    ) => {
      if (response.success) {
        const workspaces = patchTemplates(
          apiTemplatesToUiTemplates(
            response.templates.filter((template) => template.active)
          ),
          _containers
        );
        if (mount) setWorkspaces(workspaces);
        return workspaces;
      } else {
        myToast.error({
          title: "Fail to fetch workspace.",
          description: errorToToastDescription(response.error),
        });
      }
    };
    const response = await templateAPI.listTemplates({
      sectionid: _sectionUserInfo.sectionId,
      sub: sub,
    });
    return afterResponse(response);
  };

  /**
   * the hook will change the status of workspace base on the change in containers
   */
  useEffect(() => {
    if (workspaces && containers) {
      setWorkspaces((workspace) => patchTemplates(workspace, containers));
    }
  }, [containers]);

  /**
   * this hook do the initial fetching
   */
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (!workspaces) return <Loader />;

  return (
    <StudentContext.Provider
      value={{
        sectionUserInfo,
        workspaces,
        getWorkspace,
        setWorkspaces,
        fetchWorkspaces,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
