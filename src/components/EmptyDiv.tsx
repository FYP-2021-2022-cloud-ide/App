import Twemoji from "react-twemoji";

export type Props = {
  children?: JSX.Element;
  message?: string;
  icon?: any;
};

const EmptyDiv = ({ children, message, icon }: Props) => {
  return (
    <Twemoji noWrapper options={{ className: "twemoji" }}>
      <div className="empty-div">
        {children ? (
          children
        ) : (
          <p className="empty-div-text">
            <span className="mr-1">{icon ? icon : " 🤷‍♂️ "}</span>
            {message}
          </p>
        )}
      </div>
    </Twemoji>
  );
};

export default EmptyDiv;
