import CodeSpace from "./CodeSpace";
import data from "../../data/testing/containerList"
import EmptyDiv from "../EmptyDiv";

export interface container {
  courseTitle: string
  assignmentName: string
  existedTime: string
  containerID: string
}
export interface containerInfo {
  containersAlive: number
  containersTotal: number
}


export interface props {
  containerInfo: containerInfo
  containers: container[]

}

const ContainersList = ({ containers, containerInfo }: props) => {
  // var percentage = containerInfo.containersAlive/containerInfo.containersTotal * 100 ;
  const quota = 5;
  var percentage = containerInfo.containersAlive / quota * 100;

  const Header = () => {
    return (
      <div className="flex flex-row  max-w-xs justify-between mb-6">
        <div className="text-xl text-gray-600 dark:text-gray-300">Current Run</div>
        <div className="flex flex-col justify-between w-3/5">
          <div className="h-1 text-xs  text-gray-400 text-right"> {containerInfo.containersAlive}/{quota}</div>
          <div className='h-2 rounded-full w-full bg-gray-300 '>
            <div
              style={{ width: `${percentage}%` }}
              className={`h-2 rounded-full ${percentage === 100 ? 'bg-red-400' : 'bg-green-300'}`}>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justiy-start w-full font-bold mt-10" >
      <Header />
      {
        containers.length == 0 ? <EmptyDiv message="You have no active workspace."></EmptyDiv> :
          <div className="flex flex-wrap justify-start">
            {
              containers.map((container, i) => <CodeSpace item={container}></CodeSpace>)
            }
          </div>
      }
    </div>
  )
}

export default ContainersList