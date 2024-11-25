import { useContext } from "react";
import { HiXMark } from "react-icons/hi2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";

const AddMemberModal = ({ group }) => {
  const today = new Date();
  const axiosPublic = useAxiosPublic();
  const { users, data } = useContext(AuthContext);
  const handleSendRequest = async (id, name, email, photoURL) => {
    const requestData = {
      user_id: id,
      name: name,
      email: email,
      photoURL: photoURL,
      group_id: group._id,
      group_admin_id: data._id,
      group_admin_name: data.name,
      group_admin_email: data.email,
      group_admin_photoURL: data.photoURL,
      group_image: group.group_image,
      group_name: group.group_name,
      request_category: "group",
      request_date: today.toLocaleDateString(),
      request_time: today.toLocaleTimeString(),
    };
    const res = await axiosPublic.post("/group-request", requestData);
  };

  return (
    <>
      <dialog id="add_member" className="modal">
        <div className="modal-box max-w-3xl">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Add Member</h3>
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
            <ul className="grid grid-cols-2 gap-4">
              {data.friends?.map(({ _id, name, email, photoURL }, i) => (
                <li
                  key={i}
                  className="w-full p-2 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={photoURL}
                      alt={name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <h1 className="font-semibold">{name}</h1>
                  </div>
                  {group?.group_members?.includes(email) ? (
                    ""
                  ) : (
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        handleSendRequest(_id, name, email, photoURL)
                      }
                    >
                      Send Request
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default AddMemberModal;
