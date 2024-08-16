import React from "react";
import { IoIosClose } from "react-icons/io";

const ProfileModel = ({
  user,
  className = "",
  openProfile,
  setOpenProfile,
}) => {




  return (
    <div
      onClick={()=>setOpenProfile(false)}
      className={`${className} ${
        openProfile ? "block" : "hidden"
      } h-screen w-screen absolute z-[99] top-0 left-0 bg-[#5d5d5d54] flex justify-center items-center`}
    >
      <div onClick={(e)=>e.stopPropagation()} className="relative rounded-lg bg-[#1d1d1d] flex flex-col items-center gap-3 py-10 px-10 ">
        <IoIosClose onClick={()=>setOpenProfile(false)} className="absolute top-3 right-3 cursor-pointer text-lg hover:bg-gray-700 rounded-full"/>
        <div className="img w-[30vw] h-[30vw] sm:w-[12vw] sm:h-[12vw] ">
          <img
            src={user.pic}
            alt={user.name}
            className=" w-full object-cover object-center rounded-full"
          />
        </div>
        <h1>{user.name}</h1>
        <h1>Email: {user.email}</h1>
      </div>
    </div>
  );
};

export default ProfileModel;
