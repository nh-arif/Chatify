import { HiXMark } from "react-icons/hi2";
import image from "../../assets/image (1).png";
import { MdBlock } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { GrContactInfo } from "react-icons/gr";

import image1 from "../../assets/image (1).png";
import image2 from "../../assets/image (2).jpg";
import image3 from "../../assets/image (3).jpg";
import image4 from "../../assets/group.png";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { TbUserSearch } from "react-icons/tb";
const MemberModal = () => {
  const { groups, data } = useContext(AuthContext);
  return (
    <>
      <dialog id="member_modal" className="modal">
        <div className="modal-box max-w-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <h3 className="font-semibold text-lg">Friends</h3>
              <button
                className="btn btn-sm btn-ghost btn-circle flex tooltip"
                data-tip="Search People"
                onClick={() =>
                  document.getElementById("search_modal").showModal()
                }
              >
                <TbUserSearch className="text-lg" />
              </button>
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
          <div className="p-5">
            <div className="overflow-hidden">
              <ul className="flex flex-wrap gap-3 p-2 overflow-scroll ">
                {data?.join_groups?.map(
                  ({ group_id, group_name, group_image }, i) => (
                    <NavLink key={i} to={`/group/${group_id}`}>
                      <li
                        className="flex w-10 h-10 rounded-full justify-center items-center hover:bg-neutral cursor-pointer tooltip tooltip-right"
                        data-tip={group_name}
                      >
                        <img
                          src={group_image}
                          alt={group_name}
                          className="avatar rounded-full"
                        />
                      </li>
                    </NavLink>
                  )
                )}
              </ul>
            </div>
            <p className="text-sm mt-6">Friends</p>
            <div>
              <ul className="grid grid-cols-4 gap-3 p-2 overflow-scroll h-[23rem]">
                {data?.friends?.map(({ _id, name, photoURL }, i) => (
                  <NavLink key={i} to={`/chat/${_id}`}>
                    <li
                      className="flex cursor-pointer tooltip tooltip-bottom w-8 h-8"
                      data-tip={name}
                    >
                      <img src={photoURL} alt={name} className="rounded-full" />
                    </li>
                  </NavLink>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default MemberModal;
