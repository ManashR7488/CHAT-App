import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header
      className="bgbase-100 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                {/* <FiMessageSquare className="w-5 h-5 text-primary" /> */}
                <img src="https://cdn-icons-png.flaticon.com/512/5539/5539745.png" alt="" className="w-5 h-5 text-primary object-cover" />
              </div>
              <h1 className="text-lg font-bold">MR2 Chats</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <IoSettingsOutline className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <LuUserRound className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <MdOutlineLogout className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
