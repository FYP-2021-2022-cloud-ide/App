
const containerAPI = {
    containerList: async (sub: string) => {
        var res = await fetch('/api/container/listContainers?sub=' + sub, {
            method: 'GET'
        })
        return res.json()
    },
    addContainer: async (
        imageName: string,
        memLimit: Number,
        numCPU: Number,
        section_user_id: string,
        template_id: string,
        accessRight: string,
        useFresh: boolean) => {
        var res = await fetch('/api/container/addContainer', {
            method: 'POST',
            body: JSON.stringify({
                "imageName": imageName,
                "memLimit": memLimit,
                "numCPU": numCPU,
                "section_user_id": section_user_id,
                "template_id": template_id,
                "accessRight": accessRight,
                "useFresh": useFresh,
            }),
        })
        return res.json()
    },
    removeContainer: async (containerId: string, sub: string) => {
        var res = await fetch('/api/container/removeContainer?sub=' + sub, {
            method: 'POST',
            body: JSON.stringify({
                "containerId": containerId
            }),
        })
        return res.json()
    },
    addTempContainer: async (memLimit: Number, numCPU: Number, imageName: string, sub: string, accessRight: string) => {
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
    removeTempContainer: async (containerId: string, sub: string) => {
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