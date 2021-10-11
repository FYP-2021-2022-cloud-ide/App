interface container{
    name:string
    link:string
    description: string
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
    // existedTime: '32423534'}]
    return(
        <div className="flex flex-col justify-start ">
            <div className="flex flex-row justify-start gap-x-4 pb-4">
                <img src="/coursePage/workspacesLogo.svg"  className="" />
                <div className="mt-4 text-2xl text-gray-800">Workspaces</div>
                <button>
                    <img className="transform scale-100 hover:scale-125" src="/coursePage/carbonAdd.svg" />
                </button>
            </div>
            <div className="flex flex-col gap-y-6 justify-start ">
                {containers!=null && containers.map((container)=>{
                    return(
                        <button className="flex flex-col justify-between border
                        shadow-2xl text-left rounded-xl border-blue-200 
                        hover:border-blue-400 min-h-max h-40"
                        onClick ={(e) =>{
                            }}
                            tabIndex={0}
                        >
                            <div className="ml-4">
                                <div className="font-bold">{container.name}</div>
                                <a href={container.link} target="_blank" className="text-xs underline">{container.link}</a>
                                <div className="flex flex-row justify-start mt-4"> 
                                    {/* <img src="/cplusplus.svg"  className="mr-2 mb-4" /> */}
                                    <div className="text-xs text-gray-800">
                                        {container.description}
                                    </div>
                                </div>
                            </div>
                            <div className="ml-4 mb-4 w-full">
                                {container.existContainer &&
                                <div className="flex flex-row w-10/12 h-5 justify-end">
                                    <img className="mr-2 mb-2" src="/coursePage/clocktimeBlue.svg"></img>
                                    <div className="text-xs">{container.existedTime}</div>
                                </div>}
                                {container.existContainer &&
                                <div className="flex flex-row w-10/12 h-5 justify-end">
                                    <img className="" src="/coursePage/workspaceRun.svg"></img>
                                </div>}
                                {!container.existContainer &&
                                <div className="flex flex-row w-10/12 justify-end">
                                    <img className="" src="/coursePage/notYetOpened.svg"></img>
                                </div>}
                            </div>
                        </button>
                    );
                    })
                }
                {containers== null &&
                <button className="flex flex-col border
                   
                    shadow-2xl text-left rounded-xl border-blue-200 
                    hover:border-blue-400 h-40"
                onClick ={(e) =>{
                    }}
                    tabIndex={0}
                >
                    <div className="ml-4 mt-2 font-bold text-gray-500">
                        You have no workspace for this course yet.
                    </div>
                </button>}
            </div>
        </div>
    )
}

export default WorkspacesList