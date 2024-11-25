import { useState } from "react";
import imageaa from "../../assets/image (3).jpg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(imageaa);
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <div className="max-w-screen-lg card h-[35rem] mx-auto mt-16 p-8">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <h1 className="font-semibold">Update Profile</h1>
            <button
              className="btn btn-sm btn-neutral"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack className="text-lg" /> Back
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-10">
          <div className="flex flex-col items-center mt-5">
            <img
              src={image}
              alt=""
              className="h-[320px] w-[320px] card object-contain"
            />
            <div className="flex items-center gap-5 mt-8">
              {image ? (
                <button className="btn btn-neutral px-8">Update Picture</button>
              ) : (
                <label htmlFor="image-up" className="btn px-8">
                  Choose Picture
                  <input
                    type="file"
                    name=""
                    id="image-up"
                    hidden
                    onChange={handleImage}
                  />
                </label>
              )}
              <button className="btn x-8" disabled>
                Pictures
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <form className="flex flex-col gap-2 items-start mb-10">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">User Name</span>
                </div>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered w-full "
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">User Email</span>
                </div>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered w-full "
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">User Phone</span>
                </div>
                <input
                  type="text"
                  placeholder="phone"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">User Passowrd</span>
                </div>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered w-full"
                />
              </label>
              <div className="flex justify-end mt-4 w-full">
                <button className="btn btn-neutral px-8">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
