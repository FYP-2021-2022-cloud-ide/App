import { CubeTransparentIcon } from "@heroicons/react/outline";
import WorkspaceCard from "./WorkspaceCard";
import { Workspace } from "../lib/cnails";
import EmptyDiv from "./EmptyDiv";
import { MenuItem } from "./CardMenu";

interface props {
  workspaces: Workspace[];
  onClick?: (workspace: Workspace) => void;
  // onToggleStart?: (workspace: Workspace, start: boolean) => void;
  menuItems: (workspace: Workspace) => MenuItem[];
}

const WorkspacesList = ({ workspaces, onClick, menuItems }: props) => {
  return (
    <div className="workspace-list">
      <div id="header">
        <CubeTransparentIcon id="icon"></CubeTransparentIcon>
        <p id="title">Workspaces</p>
      </div>
      {workspaces?.length == 0 ? (
        <EmptyDiv message="There is no published assignments yet."></EmptyDiv>
      ) : (
        <div className="workspace-grid">
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
                  menuItems={menuItems}
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
