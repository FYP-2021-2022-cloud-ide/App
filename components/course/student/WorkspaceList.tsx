import {CubeTransparentIcon} from "@heroicons/react/outline"
import {PlusCircleIcon} from "@heroicons/react/solid"
import Workspace from "./Workspace"

interface container{
    id: string
    name: string
    imageId: string
    assignment_config_id: string
    storage: string
    existContainer: boolean
    existedTime: string
}

interface props{
    containers: container[]
}

const WorkspacesList = ({containers}:props)=>{//
    // var containers =[{name:'dsfas', 
    // link:'https://www.google.com',
    // description: 'dsf32423423423423423423as',
    // existContainer: false,
    // existedTime: '32423534'},{name:'dsfas', 
    // link:'https://www.google.com',
    // description: 'dsf32423423423423423423as',
    // existContainer: false,
    // existedTime: '32423534'}]
    return(
        <div className="flex flex-col justify-start">
            <div className="text-gray-600 flex flex-row justify-start gap-x-4 pb-4">
                {/* <img src="/coursePage/workspacesLogo.svg"  className="" /> */}
                <CubeTransparentIcon className="w-7 h-7"></CubeTransparentIcon>
                <div className="text-lg">Workspaces</div>
                <button>
                    {/* <img className="transform scale-100 hover:scale-125" src="/coursePage/carbonAdd.svg" /> */}
                    <PlusCircleIcon className="w-7 h-7"></PlusCircleIcon>
                </button>
            </div>
            {(containers?.length )? (containers.map((container)=>{
                return(
                    <div className="grid grid-cols-3 gap-6 place-items-stretch">
                    <Workspace container={container}></Workspace>
                    </div>
                );
                }))
                :
                <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
                hover:shadow-lg transition-all ease-in-out duration-300 h-20"
                    onClick ={(e) =>{
                        }}
                        tabIndex={0}
                >
                    <div className="font-semibold text-sm text-gray-500 ">
                        You have no workspace for this course yet.
                    </div>
                </button>
            }
        </div>
    )
}

export default WorkspacesList