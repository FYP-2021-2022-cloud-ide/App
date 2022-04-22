import { CubeTransparentIcon } from "@heroicons/react/outline";
import WorkspaceCard from "./WorkspaceCard";
import EmptyDiv from "./EmptyDiv";
import { useStudent } from "../contexts/student";

const WorkspacesList = () => {
  const { workspaces } = useStudent();
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
