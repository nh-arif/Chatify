import { CiMenuKebab } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi";
import { MdPushPin, MdReply } from "react-icons/md";
import { TbClipboardCopy } from "react-icons/tb";

const MessageBoxOptions = () => {
  return (
    <>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-sm btn-circle btn-ghost flex tooltip tooltip-left m-1"
          data-tip="Options"
        >
          <CiMenuKebab />
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-gray-700 rounded-box z-10 w-36 p-2"
        >
          <li>
            <a>
              <MdPushPin className="text-lg" /> Pin
            </a>
          </li>
          <li>
            <a>
              <MdReply className="text-lg" /> Reply
            </a>
          </li>
          <li>
            <a>
              <TbClipboardCopy className="text-lg" /> Copy
            </a>
          </li>
          <li>
            <a>
              <HiOutlineTrash className="text-lg" /> Delete
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default MessageBoxOptions;
