import CodeSpace from "./ContainerCard";
import EmptyDiv from "../EmptyDiv";
import { Container, ContainerInfo } from "../../lib/cnails";
import { useCnails } from "../../contexts/cnails";
import { useEffect } from "react";

type Props = {
  containerInfo: ContainerInfo;
  containers: Container[];
};

const ContainersList = () => {
  const { sub, containers, containerInfo, fetchContainers, containerQuota } =
    useCnails();
  useEffect(() => {
    fetchContainers(sub);
  }, []);

  // don't need to go down
  if (!containers || !containerInfo || !containerQuota) return <></>;

  if (containerInfo.containersAlive != containers.length) {
    console.error("container active number does not match");
  }
  var percentage = (containers.length / containerQuota) * 100;

  const Header = () => {
    return (
      <div className="current-run-header">
        <div className="current-run-title">Current Running Containers</div>
        <div className="flex flex-col justify-between w-32">
          <div className="current-run-percentage">
            {containers.length}/{containerQuota}
          </div>
          <div className="current-run-bar-outer">
            <div
              style={{ width: `${percentage}%` }}
              className={`current-run-bar-inner ${
                percentage >= 100 ? "bg-red-400" : "bg-green-300"
              }`}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" w-full ">
      <Header />
      {containers.length == 0 ? (
        <EmptyDiv message="You have no active workspace."></EmptyDiv>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {containers.map((container, i) => {
            const { containerID, courseTitle, assignmentName, existedTime } =
              container;
            return (
              <CodeSpace
                key={containerID}
                courseTitle={courseTitle}
                containerName={assignmentName}
                existedTime={existedTime}
                containerID={containerID}
              ></CodeSpace>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContainersList;
