import { useParams } from "react-router-dom";
import { IoCameraSharp } from "react-icons/io5";
import { LuBadgePlus } from "react-icons/lu";
import { BsSend } from "react-icons/bs";
import SendBox from "../../components/SendBox/SendBox";
import ReceiveBox from "../../components/ReceiveBox/ReceiveBox";
import { HiMicrophone } from "react-icons/hi";
import { IoMdImages, IoMdInformationCircleOutline } from "react-icons/io";

import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { io } from "socket.io-client";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import InfoModal from "../../components/InfoModal/InfoModal";

const socket = io(import.meta.env.VITE_API_LOCAL);
const ChatPage = () => {
  const { user, data, chats, setChats, chatUser, setChatUser } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const messageRef = useRef();

  useEffect(() => {
    const sendData = {
      from: data._id,
      to: id,
    };
    axiosPublic.post(`/conversations`, sendData).then((res) => {
      setChats(res.data?.result);
      setChatUser(res.data?.chatUser);
    });
  }, [id]);

  const handleSendChatKey = async (e) => {
    const key = e.key;
    if (key === "Enter") {
      const today = new Date();
      const msgData = {
        author: data.name,
        from: data._id,
        to: id,
        message: messageRef.current.value,
        time: today.toLocaleTimeString(),
        date: today.toLocaleDateString(),
      };
      socket.emit("sendMessage", msgData);
      const res = await axiosPublic.post("/conversation", msgData);
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
      to: id,
      message: messageData,
      time: today.toLocaleTimeString(),
      date: today.toLocaleDateString(),
    };
    socket.emit("sendMessage", msgData);
    const res = await axiosPublic.post("/conversation", msgData);
    messageRef.current.value = "";
  };
  return (
    <>
      <InfoModal data={chatUser} />
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mt-2">
            <img
              src={chatUser?.photoURL}
              alt={chatUser?.name}
              className="w-10 h-10 object-contain rounded-full"
            />
            <p className="text-lg">{chatUser?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-ghost flex tooltip"
              data-tip="info"
              onClick={() => document.getElementById("info_modal").showModal()}
            >
              <IoMdInformationCircleOutline className="text-lg" />
            </button>
          </div>
        </div>
        <div className="mt-5 flex justify-between overflow-hidden h-full mb-10">
          <div
            className="overflow-scroll w-full flex flex-col gap-5 items-start h-full md:h-[32rem] p-2 mb-5"
            id="message_center"
          >
            {chats.map((sendMsg, i) =>
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
        <footer className="flex justify-between items-center w-full lg:w-[79%] fixed bottom-5 right-0  px-2">
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
              className="textarea textarea-bordered w-full"
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
export default ChatPage;
