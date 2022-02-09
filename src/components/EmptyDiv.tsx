export type Props = {
  children?: JSX.Element;
  message?: string;
  icon?: any;
};

const EmptyDiv = ({ children, message, icon }: Props) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-md h-36 p-6 flex flex-grow max-h-[400px]">
      {children ? (
        children
      ) : (
        <p className="text-gray-400 dark:text-gray-300 font-bold whitespace-nowrap m-auto object-center">
          <span className="mr-3 text-2xl ">🤷‍♂️</span>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmptyDiv;
