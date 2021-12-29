import { useRouter } from 'next/router'
import { googleAPI } from '../lib/googleAPI'
import {useEffect} from "react"

export default ()=>{
    const router = useRouter()

    useEffect(()=>{
        if(!router.isReady) return;
        const { code } = router.query
        //@ts-ignore
        googleAPI.getAccessToken(code)
        router.push('/cloud')
    },[router.isReady])

    return(
        <div>
            loading
        </div>
    )
}