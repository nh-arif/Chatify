import { useContext } from "react";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { BsPersonGear } from "react-icons/bs";

const ProfileModal = () => {
  const { user, handleSignOut } = useContext(AuthContext);
  return (
    <>
      <dialog id="profile_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Profile</h3>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle flex tooltip tooltip-bottom"
                data-tip="Close"
              >
                <HiXMark className="text-lg" />
              </button>
            </form>
          </div>
          <div className="p-5 flex flex-col md:flex-row gap-10 mt-5">
            <img
              src={user?.photoURL}
              className="card w-40 h-40 avatar rounded-full mx-auto"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm badge badge-neutral">Active</p>
              <h1 className="fon-semibold">{user?.displayName}</h1>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
                impedit? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Inventore, quo.
              </p>
              <div className="flex justify-end gap-5 mt-6">
                <button className="btn btn-info px-8" onClick={handleSignOut}>
                  <FaPersonWalkingDashedLineArrowRight className="text-lg" />{" "}
                  Logout
                </button>
                <Link to="/update-profile" className="btn btn-neutral px-8">
                  <BsPersonGear className="text-lg" /> Manage Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProfileModal;
