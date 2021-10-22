import {CubeTransparentIcon} from "@heroicons/react/outline"
import {PlusCircleIcon} from "@heroicons/react/solid"
import Workspace from "./Workspace"

interface Template{
    imageId: string
    id: string
    name: string
    description:string
    assignment_config_id: string
    storage: string
    containerID: string
    active: boolean
}

interface props{
    templates: Template[]
    sectionUserId: string
}

const WorkspacesList = ({templates, sectionUserId}:props)=>{//
    return(
        <div className="flex flex-col justify-start w-full">
            <div className="text-gray-600 flex flex-row justify-start gap-x-4 pb-4">
                {/* <img src="/coursePage/workspacesLogo.svg"  className="" /> */}
                <CubeTransparentIcon className="w-7 h-7"></CubeTransparentIcon>
                <div className="text-lg">Workspaces</div>
                <button>
                    {/* <img className="transform scale-100 hover:scale-125" src="/coursePage/carbonAdd.svg" /> */}
                    <PlusCircleIcon className="w-7 h-7"></PlusCircleIcon>
                </button>
            </div>
            {(templates?.length )? <div className="space-x-4 flex flex-wrap"> {templates.map((template)=>{
                return(
                    <Workspace template={template} sectionUserId={sectionUserId}></Workspace>
                );
                })}</div>
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