export async function checkInSectionBySectionUserId(sub: string, section_user_id: string){
    try{
        const response = await fetch("http://auth:8181/v1/data/user_section/section_user_id", {
          body: JSON.stringify({
            input:{
              itsc: sub,
              section_user_id
            }
          }),
          headers: {
            Authorization: `Bearer ${process.env.OPASECRET}`,
            "Content-Type": "application/json"
          },
          method: "POST"
        })
        const {result:{allow}} = await response.json()
        if (allow){
          return true
        }else{
          return false
        }
      }
      catch(error){
        console.log(error)
        return false
      }
}

export async function checkInSectionBySectionId(sub:string, section_id:string){
    try{
        const response = await fetch("http://auth:8181/v1/data/user_section/section_id", {
          body: JSON.stringify({
            input:{
              itsc: sub,
              section_id
            }
          }),
          headers: {
            Authorization: `Bearer ${process.env.OPASECRET}`,
            "Content-Type": "application/json"
          },
          method: "POST"
        })
        const {result:{allow}} = await response.json()
        if (allow){
          return true
        }else{
          return false
        }
      }
      catch(error){
        console.log(error)
        return false
      }
}

export async function checkHaveContainer(containerId: string, sub: string){
    if(containerId == "")
      return false
    try{
      const response = await fetch("http://auth:8181/v1/data/container", {
        body: JSON.stringify({
          input:{
            itsc: sub,
            container_id: containerId
          }
        }),
        headers: {
          Authorization: `Bearer ${process.env.OPASECRET}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      const {result:{allow}} = await response.json()
      if (allow){
        return true
      }else{
        return false
      }
    }
    catch(error){
      console.log(error)
      return false
    }
}

export async function checkRoleBySectionId(sub: string, sectionId: string, role: string){
    try{
        console.log('inside role checking')
        const response = await fetch("http://auth:8181/v1/data/section_role/section_id", {
          body: JSON.stringify({
            input:{
              itsc: sub,
              path: [sectionId,role]
            }
          }),
          headers: {
            Authorization: `Bearer ${process.env.OPASECRET}`,
            "Content-Type": "application/json"
          },
          method: "POST"
        })
        const {result:{allow}} = await response.json()
        if (allow){
          return true
        }else{
          return false
        }
      }catch(error){
        console.log(error)
        return false
      }
}

export async function checkRoleBySectionUserId(sub: string, sectionUserId: string, role: string){
    try{
        console.log('inside role checking')
        const response = await fetch("http://auth:8181/v1/data/section_role/section_user_id", {
          body: JSON.stringify({
            input:{
              itsc: sub,
              path: [sectionUserId,role]
            }
          }),
          headers: {
            Authorization: `Bearer ${process.env.OPASECRET}`,
            "Content-Type": "application/json"
          },
          method: "POST"
        })
        const {result:{allow}} = await response.json()
        if (allow){
          return true
        }else{
          return false
        }
      }catch(error){
        console.log(error)
        return false
      }
}