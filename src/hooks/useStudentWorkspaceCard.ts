import React from "react";
import { MenuItem } from "../components/CardMenu";
import { useCnails } from "../contexts/cnails";
import { useContainers } from "../contexts/containers";
import { useStudent } from "../contexts/student";
import { Container, Workspace } from "../lib/cnails";
import { CPU, memory } from "../lib/formHelper";
import useContainerCard from "./useContainerCard";

type Return = {
  menuItems: MenuItem[];
  onClick: (e: React.MouseEvent) => void;
  duration: string;
  comment: string;
  container: Container;
  color: "gray" | "yellow" | "green";
};

const useStudentWorkspaceCard = (workspace: Workspace): Return => {
  const { sub } = useCnails();
  const { sectionUserInfo } = useStudent();
  const { containers, createContainer, removeContainer } = useContainers();
  const container = containers.find(
    (c) => c.redisPatch.sourceId == workspace.id
  );
  const { duration, onClick, comment } = useContainerCard(container);

  const menuItems = [
    {
      text: workspace.containerId ? "Stop workspace" : "Start workspace",
      onClick: async () => {
        if (!workspace.containerId) {
          await createContainer({
            imageName: workspace.imageId,
            memLimit: memory,
            numCPU: CPU,
            section_user_id: sectionUserInfo.sectionUserId,
            template_id: workspace.id,
            accessRight: "student",
            useFresh: false,
            title: workspace.name,
            sub: sub,
            event: "WORKSPACE_START",
            sectionUserInfo: sectionUserInfo,
          });
        } else {
          await removeContainer(workspace.containerId);
        }
      },
    },
  ];

  const color =
    workspace.status == "DEFAULT"
      ? workspace.containerId
        ? "green"
        : "gray"
      : "yellow";

  return {
    menuItems,
    onClick,
    duration,
    comment,
    container,
    color,
  };
};

export default useStudentWorkspaceCard;
