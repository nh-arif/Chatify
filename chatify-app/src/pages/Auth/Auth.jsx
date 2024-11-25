import { useState } from "react";
import Login from "./shared/Login";
import Register from "./shared/Register";
import image from "../../../public/logo.png";
import {
  FaPersonWalkingArrowLoopLeft,
  FaPersonWalkingArrowRight,
} from "react-icons/fa6";

const Auth = () => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <div className="max-w-screen-sm mx-auto p-6">
        <div className="card bg-base-100 md:p-8 h-[550px] items-center justify-center relative mt-8">
          <div className="mx-auto">
            <h1 className="text-3xl font-kaushan">
              Welcome To Chatify
         
            </h1>
          </div>
          {/* <div className="mt-2"> */}
          <div className="card mt-2 p-3 mx-auto w-full relative">
            {tab === 0 ? <Login /> : tab === 1 ? <Register /> : ""}
            {/* </div> */}
          <div className="absolute -bottom-10 flex justify-start w-11/12">
            {tab === 0 ? (
              <button className="btn btn-ghost px-8" onClick={() => setTab(1)}>
                <FaPersonWalkingArrowRight className="text-lg" />
                Register Now
              </button>
            ) : (
              <button className="btn btn-ghost px-8" onClick={() => setTab(0)}>
                Already have an account ?
                <FaPersonWalkingArrowLoopLeft className="text-lg" />
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
