import { 
    ContainerAddResponse ,
    ContainerListResponse,
    SuccessStringResponse
  } from "./api";
  
const containerAPI = {
    containerList: async (sub: string): Promise<ContainerListResponse> => {
        var res = await fetch('/api/container/listAllContainers?sub=' + sub, {
            method: 'GET'
        })
        return res.json()
    },

    addTempContainer: async (
        memLimit: Number,
        numCPU: Number, 
        imageName: string, 
        sub: string, 
        accessRight: string): Promise<ContainerAddResponse> => {
        var res = await fetch('/api/container/addTempContainer?sub=' + sub, {
            method: 'POST',
            body: JSON.stringify({
                memLimit,
                numCPU,
                imageName,
                accessRight
            })
        })
        return res.json()
    },
    removeTempContainer: async (containerId: string, sub: string): Promise<SuccessStringResponse> => {
        var res = await fetch('/api/container/removeTempContainer?sub=' + sub, {
            method: 'POST',
            body: JSON.stringify({
                containerId,
            })
        })
        return res.json()
    },

}

export { containerAPI }