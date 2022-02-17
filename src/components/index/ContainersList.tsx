import CodeSpace from "./ContainerCard";
import EmptyDiv from "../EmptyDiv";
import { Container, ContainerInfo } from "../../lib/cnails";
import { defaultQuota, useCnails } from "../../contexts/cnails";
import { useEffect } from "react";

type Props = {
  containerInfo: ContainerInfo;
  containers: Container[];
};

const ContainersList = () => {
  const { sub, containers, fetchContainers, containerQuota } = useCnails();
  useEffect(() => {
    fetchContainers(sub);
  }, []);

  const numContainers = containers ? containers.length : 0;
  const quota = containerQuota ? containerQuota : defaultQuota;

  var percentage = (numContainers / quota) * 100;

  const Header = () => {
    return (
      <div className="current-run-header">
        <div className="current-run-title">Current Running Containers</div>
        <div className="flex flex-col justify-between w-32">
          <div className="current-run-percentage">
            {numContainers}/{quota}
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
      {containers &&
        (containers.length == 0 ? (
          <EmptyDiv message="You have no active workspace."></EmptyDiv>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {containers.sort().map((container, i) => {
              const { containerID, courseTitle, assignmentName, existedTime } =
                container;
              return (
                <CodeSpace
                  key={containerID}
                  courseTitle={courseTitle}
                  containerName={assignmentName}
                  existedTime={existedTime}
                  containerID={containerID}
                  zIndex={containers.length - i}
                ></CodeSpace>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default ContainersList;
