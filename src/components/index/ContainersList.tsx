import CodeSpace from "./CodeSpace";
import EmptyDiv from "../EmptyDiv";

export interface container {
  courseTitle: string;
  assignmentName: string;
  existedTime: string;
  containerID: string;
}
export interface containerInfo {
  containersAlive: number;
  containersTotal: number;
}

export type Props = {
  containerInfo: containerInfo;
  containers: container[];
};

const ContainersList = ({
  containerInfo: { containersAlive, containersTotal },
  containers,
}: Props) => {
  // var percentage = containerInfo.containersAlive/containerInfo.containersTotal * 100 ;
  const quota = 5;

  if (!containersAlive) containersAlive = 0;
  var percentage = (containersAlive / quota) * 100;

  const Header = () => {
    return (
      <div className="current-run-header">
        <div className="current-run-title">Current Run</div>
        <div className="flex flex-col justify-between w-3/5">
          <div className="current-run-percentage">
            {containersAlive}/{quota}
          </div>
          <div className="current-run-bar-outer">
            <div
              style={{ width: `${percentage}%` }}
              className={`current-run-bar-inner ${
                percentage === 100 ? "bg-red-400" : "bg-green-300"
              }`}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justiy-start w-full font-bold ">
      <Header />
      {containers.length == 0 ? (
        <EmptyDiv message="You have no active workspace."></EmptyDiv>
      ) : (
        <div className="flex flex-wrap justify-start">
          {containers.map((container, i) => (
            <CodeSpace key={container.containerID} item={container}></CodeSpace>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContainersList;
