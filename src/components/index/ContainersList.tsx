import ContainerCard from "./ContainerCard";
import EmptyDiv from "../EmptyDiv";
import { Container, ContainerInfo } from "../../lib/cnails";
import { useCnails } from "../../contexts/cnails";
import { useEffect } from "react";

type Props = {
  containerInfo: ContainerInfo;
  containers: Container[];
};

const ContainersList = () => {
  const {
    sub,
    userId,
    containers,
    containerInfo,
    fetchContainers,
    containerQuota,
  } = useCnails();
  useEffect(() => {
    fetchContainers(sub, userId);
  }, []);
  const numActiveContainers = containerInfo ? containers.length : 0;
  const quota = containerQuota;

  var percentage = (numActiveContainers / quota) * 100;

  return (
    <div className=" w-full ">
      <div className="current-run-header">
        <div className="current-run-title">Current Running Workspaces</div>
        <div className="flex flex-col justify-between w-32">
          <div className="current-run-percentage" id="current-run-percentage">
            {numActiveContainers}/{quota}
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
      {containers &&
        (containers.length == 0 ? (
          <EmptyDiv message="You have no active workspace."></EmptyDiv>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            id="container-list-grid"
          >
            {containers.sort().map((container, i) => {
              const { containerID } = container;
              return (
                <ContainerCard
                  key={containerID}
                  {...container}
                  zIndex={containers.length - i}
                ></ContainerCard>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default ContainersList;
