import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { handleLoginUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const { handleSubmit, register } = useForm();
  const handleLogin = (e) => {
    handleLoginUser(e.email, e.password).then((res) => {
  
      if (res?.user) {
        navigate("/chat");
        toast.success("Login");
      }
    });
  };
  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit(handleLogin)}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Write your email</span>
          </div>
          <input
            type="text"
            placeholder="email"
            className="input input-bordered w-full"
            {...register("email")}
          />
        </label>
        <label className="form-control w-full relative">
          <div className="label">
            <span className="label-text">Write your password</span>
          </div>
          <input
            type={show ? "text" : "password"}
            placeholder="password"
            className="input input-bordered w-full"
            {...register("password")}
          />
          <span
            className="absolute right-8 bottom-4"
            onClick={() => setShow(!show)}
          >
            {show ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </label>
        <div className="flex justify-end w-full mt-4">
          <button className="btn btn-neutral px-8" type="submit">
            <FaPersonWalkingArrowLoopLeft className="text-lg" /> Login
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
