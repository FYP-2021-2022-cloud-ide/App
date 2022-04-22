/**
 * a simple spinning loader. You can pass a JSX as children.
 */
const Loader = ({ children }: { children?: JSX.Element }) => {
  return (
    <div className={` flex flex-row justify-center`}>
      <button className="select-none cursor-default btn btn-circle btn-lg btn-ghost loading text-gray-400 dark:text-gray-300 w-full ">
        {children}
      </button>
    </div>
  );
};
export default Loader;
