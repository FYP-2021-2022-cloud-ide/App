import { Toaster, Toast, ToastBar } from "react-hot-toast";
import Twemoji from "react-twemoji";
import myToast, { loadingTime } from "./CustomToast";

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        // this can the default duration of the toast
        duration: 5000,
      }}
    >
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
                    <div className="flex flex-row items-start space-x-2">
                      {icon}
                      <div className="text-sm">
                        {(message as JSX.Element).props.children}
                      </div>
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
