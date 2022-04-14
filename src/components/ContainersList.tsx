import ContainerCard from "./ContainerCard";
import EmptyDiv from "./EmptyDiv";

import { useContainers } from "../contexts/containers";
import moment from "moment";

const ContainersList = () => {
  const { containers, containerQuota: quota } = useContainers();

  var numActiveContainers = containers ? containers.length : 0;
  var percentage = containers ? (containers.length / quota) * 100 : 0;

  return (
    <div className=" w-full ">
      <div id="current-run" className="flex flex-row space-x-3 mb-2">
        <div className="text-xl text-gray-600 dark:text-gray-300 font-bold whitespace-nowrap">
          Current Running Workspaces
        </div>
        <div className="flex flex-col justify-between w-32">
          <div className="h-1 text-xs  text-gray-400 text-right">
            <span id="active-num">{numActiveContainers}</span>/
            <span id="quota">{quota}</span>
          </div>
          <div className=" h-2 rounded-full w-full bg-gray-300 overflow-hidden">
            <div
              style={{ width: `${percentage}%` }}
              className={` h-2 rounded-full ${
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
            {containers
              .sort((a, b) => {
                if (moment(a.startAt) > moment(b.startAt)) return -1;
                else if (moment(a.startAt) < moment(b.startAt)) return 1;
                else return 0;
              })
              .map((container, i) => {
                return (
                  <ContainerCard
                    key={
                      container.id == ""
                        ? container.redisPatch.tempId
                        : container.id
                    }
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
