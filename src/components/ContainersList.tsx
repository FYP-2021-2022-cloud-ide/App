import ContainerCard from "./ContainerCard";
import EmptyDiv from "./EmptyDiv";
import { Container, ContainerInfo } from "../lib/cnails";
import { useEffect } from "react";
import { useContainers } from "../contexts/containers";
import moment from "moment";


const ContainersList = () => {
  const {
    containers,
    containerQuota: quota,
  } = useContainers();
  // useEffect(() => {
  //   fetchContainers();
  // }, []);

  var numActiveContainers = containers ? containers.length : 0;
  var percentage = containers ? (containers.length / quota) * 100 : 0;

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
              className={`current-run-bar-inner ${percentage >= 100 ? "bg-red-400" : "bg-green-300"
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
            {containers.sort((a, b) => {
              if (moment(a.startAt) > moment(b.startAt)) return -1;
              else if (moment(a.startAt) < moment(b.startAt)) return 1;
              else return 0;
            }).map((container, i) => {
              return (
                <ContainerCard
                  key={container.id}
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
