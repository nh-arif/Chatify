import { TbInfoTriangleFilled, TbUsersGroup } from "react-icons/tb";
import image from "../../assets/image (1).png";

import { BsSend } from "react-icons/bs";
import { IoMdImages } from "react-icons/io";
import { HiMicrophone } from "react-icons/hi2";
import { IoCameraSharp } from "react-icons/io5";
import { LuBadgePlus } from "react-icons/lu";
import { useContext, useEffect, useRef, useState } from "react";
import SendBox from "../../components/SendBox/SendBox";
import ReceiveBox from "../../components/ReceiveBox/ReceiveBox";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import InfoModal from "../../components/InfoModal/InfoModal";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AddMemberModal from "../../components/InfoModal/shared/AddMemberModal";
import RequestMemberModal from "../../components/InfoModal/shared/RequestMemberModal";
const socket = io(import.meta.env.VITE_API_LOCAL);

const GroupChat = () => {
  const today = new Date();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, groupMessage, setGroupMessage } = useContext(AuthContext);
  const [groupInfo, setGroupInfo] = useState([]);
  const axiosPublic = useAxiosPublic();
  const messageRef = useRef();

  useEffect(() => {
    axiosPublic.get(`/group-info/${id}`).then((res) => {
      setGroupInfo(res.data);
      socket.emit("joinRoom", res.data?.group_name);
    });
  }, []);

  useEffect(() => {
    axiosPublic
      .post("/group-converstions", {
        group_name: groupInfo?.group_name,
      })
      .then((res2) => {
       
        setGroupMessage(res2.data);
      });
  }, []);

  useEffect(() => {
    socket.off("getGroupMessage");
    socket.on("getGroupMessage", (msgData) => {
    
      setGroupMessage((prev) => [...prev, msgData]);
    });
    return () => socket.off("getGroupMessage");
  }, []);

  const handleSendChatKey = async (e) => {
    const key = e.key;
    if (key === "Enter") {
      const today = new Date();
      const msgData = {
        group_name: groupInfo.group_name,
        author: data.name,
        from: data._id,
        to: id,
        message: messageRef.current.value,
        time: today.toLocaleTimeString(),
        date: today.toLocaleDateString(),
      };
      socket.emit("groupMessage", { room: groupInfo.group_name, msgData });
      const res = await axiosPublic.post("/group-conversation", msgData);
     
      messageRef.current.value = "";
    } else if (key === "Delete") {
      messageRef.current.value = "";
    }
  };
  const handleSendChat = async (messageData) => {
    const today = new Date();
    const msgData = {
      author: data.name,
      from: data._id,
      to: groupInfo._id,
      message: messageData,
      time: today.toLocaleTimeString(),
      date: today.toLocaleDateString(),
    };
    socket.emit("groupMessage", { room: groupInfo.group_name, msgData });
    const res = await axiosPublic.post("/group-conversation", msgData);
    messageRef.current.value = "";
  };

  return (
    <>
      <InfoModal data={groupInfo} group={true} />
      <AddMemberModal group={groupInfo} />
      <RequestMemberModal group={groupInfo} />
      <div className="max-w-screen-lg mx-auto min-h-screen mt-5 relative">
        <header className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-sm btn-neutral "
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <img
              src={groupInfo.group_image}
              alt=""
              className="w-10 rounded object-contain"
            />
            <h1 className="font-semibold text-xl">{groupInfo.group_name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="btn btn-sm btn-circle btn-ghost flex tooltip"
              data-tip="Group members"
            >
              <TbUsersGroup className="text-lg" />
            </button>
            <button
              className="btn btn-sm btn-circle btn-ghost flex tooltip"
              data-tip="Group info"
              onClick={() => document.getElementById("info_modal").showModal()}
            >
              <TbInfoTriangleFilled className="text-lg" />
            </button>
          </div>
        </header>
        <div className="overflow-hidden">
          <div className="overflow-scroll flex flex-col gap-3 h-full lg:h-[33rem]">
            {groupMessage?.map((sendMsg, i) =>
              sendMsg?.from === data._id ? (
                <div key={i} className="flex w-full justify-end">
                  <SendBox msg={sendMsg} user={data} />
                </div>
              ) : (
                <div key={i} className="flex w-full">
                  <ReceiveBox msg={sendMsg} user={data} />
                </div>
              )
            )}
          </div>
        </div>
        <footer className="flex justify-between items-center w-full fixed bottom-5 right-0  px-2">
          <div className="hidden md:flex items-center gap-2">
            <button
              className="btn btn-circle btn-ghost flex tooltip"
              data-tip="More"
            >
              <LuBadgePlus className="text-lg" />
            </button>
            <button
              className="btn btn-circle btn-ghost flex tooltip"
              data-tip="Camera"
            >
              <IoCameraSharp className="text-lg" />
            </button>
            <button
              className="btn btn-circle btn-ghost flex tooltip"
              data-tip="Voice"
            >
              <HiMicrophone className="text-lg" />
            </button>
            <button
              className="btn btn-circle btn-ghost flex tooltip"
              data-tip="Picture"
            >
              <IoMdImages className="text-lg" />
            </button>
          </div>
          <div className="flex items-end gap-2 w-full">
            <input
              type="text"
              ref={messageRef}
              onKeyUp={handleSendChatKey}
              className="input input-bordered w-full"
            />
            <button
              className="btn btn-neutral flex tooltip"
              data-tip="Send"
              onClick={() => handleSendChat(messageRef.current.value)}
            >
              <BsSend className="text-lg" />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};
export default GroupChat;
