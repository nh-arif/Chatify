import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <div className="font-noto">
        <Outlet />
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default Root;
