import { CubeTransparentIcon } from "@heroicons/react/outline"
import { PlusCircleIcon } from "@heroicons/react/solid"
import Workspace from "./Workspace"
import { template } from "../instructor/Template/TemplateList"
import EmptyDiv from "../../EmptyDiv"



interface props {
    templates: template[]
    sectionUserId: string
}

const WorkspacesList = ({ templates, sectionUserId }: props) => {
    
    return (
        <div className="flex flex-col justify-start w-full">
            <div className="text-gray-600 flex flex-row justify-start gap-x-4 pb-4 dark:text-gray-300">
                {/* <img src="/coursePage/workspacesLogo.svg"  className="" /> */}
                <CubeTransparentIcon className="w-7 h-7"></CubeTransparentIcon>
                <div className="text-lg ">Workspaces</div>
            </div>
            {(templates?.length == 0) ? <EmptyDiv message="There is no assignments yet."></EmptyDiv> :
                <div className="grid grid-cols-2 gap-8">
                    {templates.map((template) => {
                        return <Workspace key={template.id} template={template} sectionUserId={sectionUserId}></Workspace>
                    })}
                </div>
            }
        </div>
    )
}

export default WorkspacesList