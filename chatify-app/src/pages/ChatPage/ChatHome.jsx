import { BsPersonPlus } from "react-icons/bs";
import { MdOutlineGroupAdd } from "react-icons/md";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";

const ChatHome = () => {
  return (
    <>
      <CreateGroupModal />
      <div className="flex justify-center items-center h-full">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-light font-kaushan">
            Welcome to Ch4tify
          </h1>
          <p className="text-sm mt-1">Feel free to join our community.</p>
          <div className="flex items-center gap-3 mt-4">
            <button
              className="btn btn-sm btn-neutral px-8"
              onClick={() =>
                document.getElementById("create_group").showModal()
              }
            >
              <MdOutlineGroupAdd className="text-lg" /> Create Group
            </button>
            <button className="btn btn-sm btn-info px-8" disabled> 
              <BsPersonPlus className="text-lg" /> Ask to join
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHome;
