import { useContext, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";

import { io } from "socket.io-client";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const socket = io(import.meta.env.VITE_API_LOCAL);
const CreateGroupModal = () => {
  const { data } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const today = new Date();
  const img_key = import.meta.env.VITE_IMGBB_KEY;
  const img_url = `https://api.imgbb.com/1/upload?key=${img_key}`;
  const imageRef = useRef();

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const imageData = {
      image: imageRef.current.files[0],
    };
    const res = await axios.post(img_url, imageData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.data) {
      const imageUrl = res.data?.data?.display_url;
      const groupData = {
        group_name: e.target.name.value,
        group_image: imageUrl,
        about: e.target.about.value,
        group_members: [
          {
            member_id: data._id,
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
            admin: true,
            block: false,
            mute: false,
          },
        ],
        group_admin: [
          {
            member_id: data._id,
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
            admin: true,
            block: false,
            mute: false,
          },
        ],
        block_members: [],
        group_messages: [],
        create_time: today.toLocaleDateString(),
        create_date: today.toLocaleTimeString(),
      };
      const res2 = await axiosPublic.post("/group", groupData);
      if (res2.data) {
        e.target.reset();
        return toast.success("Group Created!");
      }
    }
  };
  return (
    <>
      <dialog id="create_group" className="modal">
        <div className="modal-box max-w-xl">
          <div className="flex items-center justify-end">
            <form method="dialog">
              <button className="btn btn-sm btn-ghost">Close</button>
            </form>
          </div>
          <div className="p-5 flex flex-col">
            <p className="">Create Group</p>
            <form
              className="mt-7 flex flex-col gap-4"
              onSubmit={handleCreateGroup}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full grid-cols-2"
                  placeholder="Group Name"
                />
                <label htmlFor="image-grp" className="btn btn-neutral">
                  <LuImagePlus className="text-lg" /> Upload Picture
                  <input
                    type="file"
                    name="image"
                    ref={imageRef}
                    id="image-grp"
                    hidden
                  />
                </label>
              </div>
              <textarea
                rows={3}
                name="about"
                className="textarea textarea-bordered w-full"
                placeholder="About Group"
              ></textarea>
              <div className="flex justify-end">
                <button className="btn btn-neutral px-8">
                  <FiPlus className="text-lg" /> Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default CreateGroupModal;
