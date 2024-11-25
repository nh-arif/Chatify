import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { HiXMark } from "react-icons/hi2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const RequestMemberModal = ({ group }) => {
  const today = new Date();
  const navigate = useNavigate()
  const { data, gr_requesters } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

 
  const handleAcceptRequest = (data) => {
    const acceptData = {
      request_id: data._id,
      user_id: data.user_id,
      name: data.name,
      email: data.email,
      photoURL: data.photoURL,
      group_id: data.group_id,
      group_admin_id: data.group_admin_id,
      group_admin_name: data.group_admin_name,
      group_admin_email: data.group_admin_email,
      group_admin_photoURL: data.group_admin_photoURL,
      group_image: data.group_image,
      group_name: data.group_name,
      accept_date: today.toLocaleDateString(),
      accept_time: today.toLocaleTimeString(),
    };
    axiosPublic.post(`/group-request-accept`, acceptData).then((res) => {
    navigate(0)
    });
  };
  return (
    <>
      <dialog id="requesters_member" className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Requesters Members</h3>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                data-tip="Close"
              >
                <HiXMark className="text-lg" />
              </button>
            </form>
          </div>
          <div className="p-5">
            {gr_requesters?.map((req, i) => (
              <li
                key={i}
                className="w-full p-2 flex items-center justify-between border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={req?.group_image}
                    alt={req?.group_name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <h1 className="font-semibold text-sm">{req?.group_name}</h1>{" "}
                  invited by
                  <h1 className="font-bold">{req?.name}</h1>
                </div>
                <button
                  className="btn btn-sm"
                  onClick={() => handleAcceptRequest(req)}
                >
                  Accept Request
                </button>
              </li>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};
export default RequestMemberModal;
