import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  FaPersonWalkingArrowRight,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const today = new Date();
  const axiosPublic = useAxiosPublic();
  const img_key = import.meta.env.VITE_IMGBB_KEY;
  const img_url = `https://api.imgbb.com/1/upload?key=${img_key}`;
  const { createNewUser, auth } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();
  const handleRegister = async (e) => {
  
    const imgData = {
      image: image,
    };
    const res = await axios.post(img_url, imgData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  
    if (res.data?.data) {
      const imageUrl = res.data?.data.display_url;
      createNewUser(e.email, e.password).then((data) => {
     
        updateProfile(data?.user, {
          displayName: e.name,
          photoURL: imageUrl,
        }).then(async () => {
          // send data to database
          const data = {
            name: e.name,
            email: e.email,
            photoURL: imageUrl,
            createDate: today.toLocaleDateString(),
            createTime: today.toLocaleTimeString(),
            lastLoginDate: "",
            lastLoginTime: "",
            author_groups: [],
            join_groups: [],
            friends: [],
            messages: [],
          };
          const res2 = await axiosPublic.post("/user", data);
          if (res2?.data) {
            navigate("/chat");
            toast.success("Successfully Register!");
          }
        });
      });
    }
  };
  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="flex justify-end w-full">
          {image ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="avatar h-44 rounded-full"
              />
              <span
                className="absolute btn btn-xs"
                onClick={() => setImage(null)}
              >
                <FaRegTrashAlt />
              </span>
            </div>
          ) : (
            <label htmlFor="pro-image" className="btn btn-neutral px-8">
              <LuImagePlus className="text-lg" /> Add Picture
              <input
                type="file"
                name="image"
                id="pro-image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          )}
        </div>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Write your name</span>
          </div>
          <input
            type="text"
            placeholder="name"
            className="input input-bordered w-full"
            {...register("name")}
          />
        </label>
        <label className="form-control w-full ">
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
        <div className="flex justify-end w-full mt-6">
          <button className="btn btn-neutral px-8" type="submit">
            <FaPersonWalkingArrowRight className="text-lg" />
            Register
          </button>
        </div>
      </form>
    </>
  );
};
export default Register;
