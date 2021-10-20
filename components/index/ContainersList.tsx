import CodeSpace from "./CodeSpace";

interface container{
    courseTitle: string
    assignmentName: string
    existedTime: string
    containerID: string
}
interface containerInfo  {
	containersAlive :number
	containersTotal :number
}


interface props{
    containerInfo: containerInfo
    containers: container[]
    
}

const ContainersList = ({containers,containerInfo}:props  )=>{
    console.log(containerInfo)
    var percentage = containerInfo.containersAlive/containerInfo.containersTotal;
    return(
        <div className="flex flex-col justiy-start w-full font-bold">
          <div className="flex flex-row text-gray-600 max-w-xs justify-between mb-6">
            <div className="text-xl">Current Run</div>
            <div className="flex flex-col justify-between w-3/5">
              <div className="h-1 text-xs  text-gray-400 text-right"> {containerInfo.containersAlive}/{containerInfo.containersTotal}</div>
              <div className='h-2 rounded-full w-full bg-gray-300'>
                <div
                    style={{ width: `${percentage}%`}}
                    className={`h-2 rounded-full ${
                        percentage === 100 ? 'bg-red-400' : 'bg-red-300'}`}>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-start">
            {containers.map((container, i)=>{
              return(
                  <CodeSpace item={container}></CodeSpace>
              );
              })
            }
          </div>
      </div>
    )
}

export default ContainersList