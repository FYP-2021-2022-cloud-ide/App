
const localFileAPI = {
    listFolders: async (userId: string) => {
        var res = await fetch('/api/cloudFile/listFolders?userId=' + userId, {
            method: 'GET',
        })
        return res.json()
    },
    downloadFileToUser: async (userId: string, filePath: string, isFolder: boolean) => {
        var res = await fetch('/api/cloudFile/downloadFileToUser?userId=' + userId, {
            method: 'POST',
            body: JSON.stringify({
                "filePath": filePath,
                isFolder: isFolder,
            }),
        })
        return res.json()
    },
    downloadFileToNext: async (userId: string, filePath: string) => {
        var res = await fetch('/api/cloudFile/downloadFileToNext?userId=' + userId, {
            method: 'POST',
            body: JSON.stringify({
                "filePath": filePath,
            }),
        })
        return res.json()
    },
    uploadFiles: async (userId: string, content: FormData, update?: (progress: number) => void): Promise<{ success: boolean, message: string }> => {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.upload.onprogress = event => {
                const percentage = Math.round(event.loaded / event.total * 100);
                if (update) {
                    update(percentage)
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) {
                    reject(xhr.status)
                }
                // console.log(JSON.parse(xhr.response))
                resolve(JSON.parse(xhr.response))
            };

            xhr.open("POST", '/api/cloudFile/uploadFile?userId=' + userId, true)
            xhr.send(content)
        })

    },
    removeFile: async (userId: string, path: string) => {
        var res = await fetch('/api/cloudFile/removeFile?userId=' + userId, {
            method: 'POST',
            body: JSON.stringify({
                "path": path,
            }),
        })
        return res.json()
    },
    makeFolder: async (userId: string, path: string) => {
        var res = await fetch('/api/cloudFile/makeFolder?userId=' + userId, {
            method: 'POST',
            body: JSON.stringify({
                "path": path,
            }),
        })
        return res.json()
    },
    moveFile: async (userId: string, source: string, target: string) => {
        var res = await fetch('/api/cloudFile/moveFile?userId=' + userId, {
            method: 'POST',
            body: JSON.stringify({
                "source": source,
                "target": target,
            }),
        })
        return res.json()
    }

}

export { localFileAPI }