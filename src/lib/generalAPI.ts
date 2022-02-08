
const generalAPI = {
    updateUserData: async (sub: string, darkMode: boolean, bio: string) => {
        var res = await fetch('/api/updateUserData?sub=' + sub, {
            method: 'POST',
            body: JSON.stringify({
                "darkMode": darkMode,
                "bio": bio,
            }),
        })
        return res.json()
    },

    getUserData: async (sub: string) => {
        var res = await fetch('/api/getUserData?sub=' + sub, {
            method: 'GET',
        })
        return res.json()
    },

    courseList: async (sub: string) => {
        var res = await fetch('/api/listCourses?sub=' + sub, {
            method: 'GET',
        })
        return res.json()
    },

    getSectionInfo: async (sectionid: string, sub: string) => {
        var res = await fetch('/api/getSectionInfo?sectionid=' + sectionid + '&sub=' + sub, {
            method: 'GET'
        })
        return res.json()
    }
}

export {generalAPI}