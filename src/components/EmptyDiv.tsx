export type Props = {
  children?: JSX.Element;
  message?: string;
  icon?: any;
};

const EmptyDiv = ({ children, message, icon }: Props) => {
  return (
    <div className="empty-div">
      {children ? (
        children
      ) : (
        <p className="empty-div-text">
          <span className="mr-3 text-2xl ">{icon ? icon : " 🤷‍♂️ "}</span>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmptyDiv;
