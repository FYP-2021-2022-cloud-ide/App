type Props = {
    elements : string []
}

const Breadcrumbs = ({elements} : Props ) => {
    return (
      <div className="text-sm breadcrumbs dark:text-gray-300 ">
        <ul>
          {
            elements.map(e => {
              return (
                <li>
                  <a>{e}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default Breadcrumbs ; 