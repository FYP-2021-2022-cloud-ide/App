import CodeSpace from "./CodeSpace";
import EmptyDiv from "../EmptyDiv";
import { Container, ContainerInfo } from "../../lib/cnails";
import { useCnails } from "../../contexts/cnails";

type Props = {
  containerInfo: ContainerInfo;
  containers: Container[];
};

const ContainersList = ({ containers, containerInfo }: Props) => {
  const { containerQuota } = useCnails();
  if (containerInfo.containersAlive != containers.length) {
    console.error("container active number does not match");
  }
  var percentage = (containers.length / containerQuota) * 100;

  const Header = () => {
    return (
      <div className="current-run-header">
        <div className="current-run-title">Current Run</div>
        <div className="flex flex-col justify-between w-3/5">
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
