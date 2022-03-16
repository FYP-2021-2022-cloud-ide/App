import { CubeTransparentIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import WorkspaceCard from "./WorkspaceCard";
import { Template, Workspace } from "../lib/cnails";
import EmptyDiv from "./EmptyDiv";

interface props {
  workspaces: Workspace[];
  onClick?: (workspace: Workspace) => void;
  onToggleStart?: (workspace: Workspace, start: boolean) => void;
}

const WorkspacesList = ({ workspaces, onClick, onToggleStart }: props) => {
  return (
    <div className="flex flex-col justify-start w-full">
      <div className="course-list-title">
        <CubeTransparentIcon className="course-list-title-icon"></CubeTransparentIcon>
        <div className="course-list-title-text">Workspaces</div>
      </div>
      {workspaces?.length == 0 ? (
        <EmptyDiv message="There is no published assignments yet."></EmptyDiv>
      ) : (
        <div id="workspace-grid" className="workspace-grid">
          {workspaces
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((workspace, index) => {
              return (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  onClick={() => {
                    if (onClick) onClick(workspace);
                  }}
                  onToggleStart={() => {
                    if (onToggleStart)
                      onToggleStart(workspace, !Boolean(workspace.containerID));
                  }}
                  zIndex={workspaces.length - index}
                ></WorkspaceCard>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default WorkspacesList;
