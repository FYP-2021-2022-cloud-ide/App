const sandboxAPI = {
    addSandbox: async (memLimit: Number, numCPU: Number, sandboxImageId: string) =>{
        var res = await fetch('/api/sandbox/addSandbox',{
            method: 'POST',
            body: JSON.stringify({
                memLimit,
                numCPU,
                sandboxImageId
            })
        })
        return res.json()
    },
    addSandboxImage: async (description: string, tempContainerId: string, title: string, userId: string) =>{
        var res = await fetch('/api/sandbox/addSandboxImage',{
            method: 'POST',
            body: JSON.stringify({
                description,
                tempContainerId,
                title,
                userId
            })
        })
        return res.json()
    },

    listSandboxImage: async (userId: string) =>{
        var res = await fetch(`/api/sandbox/listSandboxImage?userId=${userId}`,{
            method: 'GET'
        })
        return res.json()
    },
    removeSandbox: async (sandboxId: string, userId: string) =>{
        var res = await fetch('/api/sandbox/removeSandbox',{
            method: 'POST',
            body: JSON.stringify({
                sandboxId,
                userId
            })
        })
        return res.json()
    },
    removeSandboxImage: async (sandboxImageId: string, userId: string) =>{
        var res = await fetch('/api/sandbox/removeSandboxImage',{
            method: 'POST',
            body: JSON.stringify({
                sandboxImageId,
                userId
            })
        })
        return res.json()
    },
    updateSandboxImage: async (sandboxImageId: string, title: string ,description: string, tempContainerId: string, userId: string) =>{
        var res = await fetch('/api/sandbox/updateSandboxImage',{
            method: 'POST',
            body: JSON.stringify({
                sandboxImageId,
                description,
                tempContainerId,
                title,
                userId
            })
        })
        return res.json()
    }
}

export {sandboxAPI}

