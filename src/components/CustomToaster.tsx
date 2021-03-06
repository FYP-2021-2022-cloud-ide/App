import { Toaster, Toast, ToastBar } from "react-hot-toast";
import Twemoji from "react-twemoji";
import myToast, { loadingTime } from "./CustomToast";

const CustomToaster = () => {
  return (
    <Toaster position="bottom-right">
      {(t: Toast) => {
        return (
          <Twemoji noWrapper options={{ className: "twemoji" }}>
            <div
              data-click-action={Boolean(
                (t.type != "loading" && myToast.onClickDismiss[t.id]) ||
                  myToast.onClickCallbacks[t.id]
              )}
              onClick={() => {
                if (t.type != "loading" && myToast.onClickDismiss[t.id])
                  myToast.dismiss(t.id);
                // dirty
                if (myToast.onClickCallbacks[t.id]) {
                  myToast.onClickCallbacks[t.id]();
                }
              }}
            >
              <ToastBar toast={t}>
                {({ icon, message }) => {
                  return (
                    <div className="flex flex-row items-start space-x-2 text-sm max-w-[100%]">
                      {icon}

                      <div>{(message as JSX.Element).props.children}</div>
                    </div>
                  );
                }}
              </ToastBar>
            </div>
          </Twemoji>
        );
      }}
    </Toaster>
  );
};

export default CustomToaster;
