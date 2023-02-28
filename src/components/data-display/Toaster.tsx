import { Toaster as ReactHotToaster, ToastBar } from "react-hot-toast";

const Toaster = () => (
  <ReactHotToaster>
    {(t) => (
      <ToastBar toast={t}>
        {({ icon, message }) => (
          <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-4 border-b-slate-100 py-2">
              {icon}
              <p className="text-xs capitalize">
                {t.type === "loading" ? `${t.message}` : t.type}
              </p>
            </div>
            {t.type !== "loading" && (
              <div className="mt-2 border-t-2 border-t-slate-100 py-2">
                <p className="text-xs">{message}</p>
              </div>
            )}
          </div>
        )}
      </ToastBar>
    )}
  </ReactHotToaster>
);

export default Toaster;
