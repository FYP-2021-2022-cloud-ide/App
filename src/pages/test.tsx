import { useEffect } from "react"
import Layout from "../components/Layout"

const test = () => {
    useEffect(() => {
        console.log("print")
    })
    return <div className=" bg-white h-full flex flex-col ">
        <div className="h-10 bg-green-300 w-full"></div>
        <div className="grow-1 bg-blue-300 w-full h-full p-10 overflow-scroll">
            <div className="h-[2000px] w-96 bg-red-200"></div>
        </div>
    </div>
}

export default test 