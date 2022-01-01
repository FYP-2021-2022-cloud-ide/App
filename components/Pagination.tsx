import { Dispatch, SetStateAction } from "react"

interface props {
    notificationsPerPage: number
    totalNotifications: number
    setPageNumber: Dispatch<SetStateAction<number>>
}

const Pagination = ({notificationsPerPage, totalNotifications, setPageNumber} : props) => {
    var pageNumbers = []
    for (let i = 1; i<= Math.ceil(totalNotifications/notificationsPerPage);i++){
        pageNumbers.push(i)
    }
    return(
        <nav className="flex flex-row space-x-4 text-black px-2 py-2">
            {pageNumbers.map(number=>{
                return(
                        <button key={number} onClick={()=>{
                            setPageNumber(number)
                        }}>
                            {number}
                        </button>
                )
            })}
        </nav>
    )

}

export default Pagination