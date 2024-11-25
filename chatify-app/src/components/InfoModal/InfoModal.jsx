import { HiXMark } from "react-icons/hi2";
import image from "../../assets/image (1).png";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { TbUsersPlus } from "react-icons/tb";
import { LuFileBox } from "react-icons/lu";
import { TiPinOutline } from "react-icons/ti";
import { RiUserReceived2Line } from "react-icons/ri";

const InfoModal = ({ data, group }) => {
  return (
    <>
      <dialog id="info_modal" className="modal">
        <div className="modal-box max-w-xl">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">
              {group ? "Group" : "Profile"} info
            </h1>
            <div className="flex items-center gap-3">
              {group && (
                <>
                  <button
                    className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                    data-tip="Add members"
                    onClick={() =>
                      document.getElementById("add_member").showModal()
                    }
                  >
                    <TbUsersPlus className="text-lg" />
                  </button>
                 
                </>
              )}
              <button
                className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                data-tip="Pin messages"
              >
                <TiPinOutline className="text-lg" />
              </button>
              <button
                className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                data-tip="Files"
              >
                <LuFileBox className="text-lg" />
              </button>
              <button
                className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                data-tip="Share"
              >
                <FaRegShareFromSquare className="text-lg" />
              </button>
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-bottom"
                  data-tip="Close"
                >
                  <HiXMark className="text-lg" />
                </button>
              </form>
            </div>
          </div>
          <div className="p-5">
            {group === true ? (
              <>
                <div className="grid grid-cols-3 gap-5">
                  <div className=" flex flex-col justify-center items-center">
                    <img
                      src={data.group_image}
                      alt={data.group_name}
                      className="avatar w-36 h-36 object-contain rounded-xl"
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2 p-3">
                    <p className="text-sm badge badge-neutral">Active</p>
                    <p className="text-xl">{data.group_name}</p>
                    <p className="text-sm">{data?.about?.slice(0, 200)}....</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-5 mt-7 mx-auto">
                  {data?.group_members?.map(({ name, photoURL }, i) => (
                    <li
                      key={i}
                      className="flex rounded-full transition-all duration-100 cursor-pointer tooltip"
                      data-tip={name}
                    >
                      <img
                        src={photoURL}
                        alt={name}
                        className="object-contain rounded-full hover:scale-110 transition-all duration-200 w-10 h-10"
                      />
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-end gap-4 mt-5">
                  <button className="btn btn-neutral px-8">Edit Group</button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-5">
                  <div className=" flex flex-col justify-center items-center">
                    <img
                      src={data.photoURL}
                      alt={data.name}
                      className="avatar w-36 h-36 object-contain rounded-xl"
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2 p-3">
                    <p className="text-sm badge badge-neutral">Active</p>
                    <p className="text-xl">{data.name}</p>
                    <p className="text-sm">{data.email}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-5 mt-7 mx-auto">
                  {data?.friends?.map(({ name, photoURL }, i) => (
                    <li
                      key={i}
                      className="flex rounded-full transition-all duration-100 cursor-pointer tooltip"
                      data-tip={name}
                    >
                      <img
                        src={photoURL}
                        alt={name}
                        className="object-contain rounded-full hover:scale-110 transition-all duration-200 w-10 h-10"
                      />
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-end gap-4 mt-5">
                  <button className="btn btn-neutral px-8">Edit Profile</button>
                </div>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};
export default InfoModal;
