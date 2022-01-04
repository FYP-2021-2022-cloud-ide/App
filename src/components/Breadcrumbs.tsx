import Link from "next/link"

type Props = {
    elements : {
      name : string , 
      path : string , 
    }[]
}

const Breadcrumbs = ({elements} : Props ) => {
    return (
      <div className="text-sm breadcrumbs dark:text-gray-300 ">
        <ul>
          {
            elements.map(e => {
              return (
                <li key={e.name} className="text-gray-600 dark:text-gray-300">
                  <Link href={e.path}>{e.name}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default Breadcrumbs ; 