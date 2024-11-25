import { useContext, useEffect, useState } from "react";
import { BsPeople, BsPersonCheck, BsPersonUp } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { RiDeleteBin4Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchPeopleModal = () => {
  const today = new Date();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { users, data, requesters } = useContext(AuthContext);

  const handleSendRequest = async (id, name, email, photoURL) => {
    const requestData = {
      author: data?.name,
      from: data?._id,
      photo_url: data?.imageURL,
      to: id,
      to_name: name,
      to_email: email,
      to_photoURL: photoURL,
      request_date: today.toLocaleDateString(),
      request_time: today.toLocaleTimeString(),
    };
    const res = await axiosPublic.post("/send-request", requestData);
    console.log(res.data?.message);
    if (res.data?.message) {
      return toast.success(res.data?.message);
    }
    return toast.success("Request send");
    navigate("/chat");
  };
  const handleAcceptRequest = async (id, user, from) => {
    const data = {
      friend_from: from,
      to: user,
      accept_date: today.toLocaleDateString(),
      accept_time: today.toLocaleTimeString(),
    };
    const res = await axiosPublic.post("/accept-request", data);
    const res2 = await axiosPublic.delete(`/delete-request/${id}`);
    if (res.data) {
      toast.success("Request accept!");
      navigate("/chat");
    }
  };
  const handleDelete = async (id) => {
    const res = await axiosPublic.delete(`/delete-request/${id}`);
    if (res) {
      toast.success("Request deleted!");
      navigate("/chat");
    }
  };
  return (
    <>
      <dialog id="search_modal" className="modal">
        <div className="modal-box max-w-5xl relative">
          <div className="flex justify-between items-center sticky top-0">
            <div className="flex items-center gap-5">
              <h3 className="font-semibold text-lg">Peoples</h3>
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                  data-tip="All Peoples"
                  onClick={() => setTab(0)}
                >
                  <BsPeople className="text-lg" />
                </button>
                <button
                  className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                  data-tip="All Request"
                  onClick={() => setTab(1)}
                >
                  <BsPersonCheck className="text-lg" />
                </button>
              </div>
            </div>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                data-tip="Close"
              >
                <HiXMark className="text-lg" />
              </button>
            </form>
          </div>
          <div className="p-5 overflow-hidden">
            {tab === 0 ? (
              <ul className="overflow-scroll h-full grid md:grid-cols-2 gap-3 p-5">
                {users?.map(({ _id, name, email, photoURL }, i) => (
                  <li
                    key={i}
                    className={`flex flex-row justify-between p-2 hover:bg-neutral cursor-pointer `}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={photoURL}
                        alt={name}
                        className="avatar w-5 h-5 rounded-full"
                      />
                      <h1 className="font-semibold text-sm">{name}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-sm px-8 btn-neutral"
                        onClick={() =>
                          handleSendRequest(_id, name, email, photoURL)
                        }
                      >
                        <BsPersonUp className="text-lg" />
                        Send Request
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="overflow-scroll h-full grid md:grid-cols-2 gap-3 p-5">
                {requesters?.map(({ _id, from, author, imageURL }, i) => (
                  <li
                    key={i}
                    className={`flex flex-row justify-between p-2 hover:bg-neutral cursor-pointer `}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={imageURL}
                        alt={author}
                        className="avatar w-5 h-5 rounded-full"
                      />
                      <h1 className="font-semibold text-sm">{author}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-sm px-8 btn-neutral"
                        onClick={() => handleAcceptRequest(_id, data._id, from)}
                      >
                        <BsPersonCheck className="text-lg" />
                        Accept Request
                      </button>
                      <button
                        className="btn btn-sm btn-primary flex tooltip"
                        data-tip="Delete"
                        onClick={() => handleDelete(_id)}
                      >
                        <RiDeleteBin4Line className="text-lg" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};
export default SearchPeopleModal;
