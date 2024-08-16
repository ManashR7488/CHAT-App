import React, { useState } from "react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [open, setOpen] = useState(false);
  const  [openProfile, setOpenProfile] = useState(false);
  const { user } = ChatState();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const showProfileModel = () => {
    setOpen(!open);
    setOpenProfile(true);
  };
  const LogOut = async () => {
    const { data } = await axios.get("/api/logout");
    toast.success(data.message , { position: "top-right" });
    navigate("/");
  };

  return (
    <>
      <ProfileModel user={user} openProfile={openProfile} setOpenProfile={setOpenProfile} />
      <div className="h-[8.5vh] w-full bg-gray-700 flex justify-between items-center px-1 sm:px-[0.5vw]">
        <div className="w-[33.33%]">
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Search Users to Chat"
            data-tooltip-place="bottom"
            className="shadow-lg flex gap-1 items-center justify-center bg-gray-600 text-gray-300 rounded-full px-3 py-3 sm:py-1 sm:px-[4vw] hover:text-white hover:bg-gray-500"
          >
            <FaSearch className="text-sm" />
            <h1 className="hidden sm:block h-full text-center pb-1">
              search user
            </h1>
          </button>
        </div>
        <div className="w-[33.33%] flex justify-center items-center">
          <h1>MR2-CHAT-APP</h1>
          {/* <h1>{user.name}</h1> */}
        </div>
        <div className="w-[33.33%] flex justify-end pr-4 items-center gap-3">
          <FaBell className="text-lg" />
          <div>
            <div className="dropdown relative left-0">
              <button
                onClick={handleOpen}
                className="focus: outline-1 bg-gray-600 p-0 sm:px-[0.9vw] sm:py-[2px] rounded-md"
              >
                <div className="flex justify-center items-center gap-2">
                  <div className="img h-8 w-8 ">
                    <img
                      src={user.pic}
                      alt=""
                      className="rounded-full h-full w-full object-cover object-center"
                    />
                  </div>
                  <FaChevronDown className="hidden sm:block" />
                </div>
              </button>
              {open ? (
                <ul className="menu absolute list-none p-0 m-[5px_0] -right-3 ">
                  <li className="menu-item m-0 bg-gray-600 hover:bg-gray-500">
                    <button
                      onClick={showProfileModel}
                      className="w-fit h-full text-nowrap text-left bg-none text-inherit border-none px-[8px] py-1 cursor-pointer"
                    >
                      My Profile
                    </button>
                  </li>
                  <li className="menu-item m-0 bg-gray-600 hover:bg-gray-500">
                    <button onClick={LogOut} className="w-fit h-full text-left bg-none text-inherit border-none px-[8px] py-1 cursor-pointer">
                      Logout
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
