import React, { useRef, useState } from "react";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaCircleNotch, FaFacebookF } from "react-icons/fa";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { GoEye } from "react-icons/go";
import { RiEyeCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCloudUpload } from "react-icons/io5";
import { FcOk } from "react-icons/fc";

const Login = () => {
  const [upName, setUpName] = useState();
  const [upEmail, setUpEmail] = useState();
  const [upPassword, setUpPassword] = useState();
  const [upConPassword, setUpConPassword] = useState();
  const [pic, setPic] = useState();
  const [upLoading, setUpLoading] = useState(false);

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const [inEmail, setInEmail] = useState();
  const [inPassword, setInPassword] = useState();

  const container = useRef(null);
  const navigate = useNavigate();

  const signUpFunction = () => {
    container.current.classList.add("active");
  };
  const signInFunction = () => {
    container.current.classList.remove("active");
  };

  const imageUpload = (pic) => {
    setUpLoading(true);
    if (pic === undefined) {
      toast.warning("Please Re Choose an image", {
        position: "top-center",
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "MERN-chatApp");
      data.append("cloud_name", "manashranjanmahanand");
      fetch(
        "https://api.cloudinary.com/v1_1/manashranjanmahanand/image/upload",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setUpLoading(false);
          setIsUpload(true);
        })
        .catch((err) => {
          console.log("Error", err);
          setUpLoading(false);
        });
    } else {
      toast.error("Please select an image in jpeg or png format", {
        position: "top-center",
      });
      setUpLoading(false);
      setIsUpload(false);
    }
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setUpLoading(true);
    if (!upName || !upEmail || !upPassword || !upConPassword) {
      toast.warn("Please fil all the fields", { position: "top-right" });
      setUpLoading(false);
      return;
    }
    if (upPassword !== upConPassword) {
      toast.warning("Password do not match", { position: "top-right" });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name: upName,
          password: upPassword,
          email: upEmail,
          pic: pic,
        },
        config
      );

      console.log(data);
      toast.success("Registration Successful", { position: "top-right" });
      setUpLoading(false);
      navigate("/chat");
    } catch (error) {
      console.log(error);
      toast.error(error, { position: "top-right" });
      setUpLoading(false);
    }
  };

  const signInHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#000000] bg-gradient-to-br from-[#2e1022] to-[#09153b] h-screen w-full flex flex-col justify-center items-center">
      <div
        ref={container}
        className="Container font-montserrat bg-white relative overflow-hidden w-[768px] max-w-[100%] min-h-[500px]  rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
      >
        <div className="form-container  sign-up absolute top-0 h-full left-0 w-1/2 opacity-0 z-[1]">
          <form
            action=""
            onSubmit={signUpHandler}
            className="bg-white flex flex-col justify-center items-center h-full px-4"
          >
            <h1 className="text-2xl font-[500]">Create Account</h1>
            <div className="social-icons my-[20px] px-0">
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FcGoogle className="inline" />
              </a>
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FaFacebookF className="inline" />{" "}
              </a>
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FaGithub className="inline" />
              </a>
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FaLinkedinIn className="inline" />{" "}
              </a>
            </div>
            <span className="text-[12px]">
              or use your email for registration
            </span>
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              type="text"
              placeholder="Name*"
              name="SignUpName"
              value={upName}
              onChange={(e) => {
                setUpName(e.target.value);
              }}
            />
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              type="email"
              name="signUpEmail"
              placeholder="Email*"
              value={upEmail}
              onChange={(e) => {
                setUpEmail(e.target.value);
              }}
            />
            <div className="w-full bg-[#eee] h-fit my-[8px] rounded-[8px] flex">
              <input
                className=" border-none bg-transparent  mx-0 py-[10px] px-[15px] text-[13px]  w-full outline-none"
                type={show1 ? "text" : "password"}
                placeholder="Password*"
                value={upPassword}
                onChange={(e) => {
                  setUpPassword(e.target.value);
                }}
              />
              <button
                onClick={() => setShow1(!show1)}
                type="button"
                className="px-2"
              >
                {show1 ? <GoEye /> : <RiEyeCloseLine />}
              </button>
            </div>
            <div className="w-full bg-[#eee] h-fit my-[8px] rounded-[8px] flex">
              <input
                className=" border-none bg-transparent  mx-0 py-[10px] px-[15px] text-[13px]  w-full outline-none"
                type={show2 ? "text" : "password"}
                placeholder="Confirm Password*"
                value={upConPassword}
                onChange={(e) => {
                  setUpConPassword(e.target.value);
                }}
              />
              <button
                onClick={() => setShow2(!show2)}
                type="button"
                className="px-2"
              >
                {show2 ? <GoEye /> : <RiEyeCloseLine />}
              </button>
            </div>
            <div className="my-[8px] mx-0 w-full ">
              <label
                htmlFor="fileIn"
                className="w-full cursor-pointer text-center flex justify-center items-center gap-1 bg-[#e9e9f8] py-[10px] px-[15px] text-[13px] rounded-[8px]"
              >
                {isUpload ? (
                  <FcOk className="inline text-[16px]" />
                ) : (
                  <IoCloudUpload className="inline text-[16px]" />
                )}
                Choose profile picture
              </label>
              <input
                id="fileIn"
                className="bg-[#eee] border-none hidden"
                type="file"
                placeholder="Profile Picture*"
                onChange={(e) => imageUpload(e.target.files[0])}
              />
            </div>
            <div className=" bg-[#7765c9] text-white text-[12px] mt-[10px] rounded-[8px] overflow-hidden">
              {upLoading ? (
                <button
                  type="submit"
                  disabled
                  className="h-full w-full text-white text-[12px] py-[8px] px-[45px] border border-solid border-transparent  font-[600] tracking-[0.5px] uppercase cursor-not-allowed "
                >
                  <FaCircleNotch className="text-[18px] animate-spin" />
                </button>
              ) : (
                <button
                  type="submit"
                  className=" bg-[#513da8] text-white text-[12px] py-[10px] px-[45px] border border-solid border-transparent  font-[600] tracking-[0.5px] uppercase cursor-pointer"
                >
                  Sign Up
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="form-container sign-in absolute top-0 h-full left-0 w-1/2 z-[2]">
          <form
            action=""
            onSubmit={signInHandler}
            className="bg-white flex flex-col justify-center items-center h-full px-4"
          >
            <h1 className="text-2xl font-[500]">Sign in</h1>
            <div className="social-icons my-[20px] px-0">
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FcGoogle className="inline" />
              </a>
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FaFacebookF className="inline" />{" "}
              </a>
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FaGithub className="inline" />
              </a>
              <a
                href="#"
                className="text-[#333] text-[13px] border border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center my-0 mx-[3px] w-[40px] h-[40px]"
              >
                {" "}
                <FaLinkedinIn className="inline" />{" "}
              </a>
            </div>
            <span className="text-[12px]">or use your email password</span>
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              required
              type="email"
              value={inEmail}
              placeholder="Email"
              onChange={(e) => {
                setInEmail(e.target.value);
              }}
            />
            <div className="w-full bg-[#eee] h-fit my-[8px] rounded-[8px] flex">
              <input
                className=" border-none bg-transparent  mx-0 py-[10px] px-[15px] text-[13px]  w-full outline-none"
                required
                type={show3 ? "text" : "password"}
                placeholder="Password"
                value={inPassword}
                onChange={(e) => {
                  setInPassword(e.target.value);
                }}
              />
              <button
                onClick={() => setShow3(!show3)}
                type="button"
                className="px-2"
              >
                {show3 ? <GoEye /> : <RiEyeCloseLine />}
              </button>
            </div>
            <a href="#" className="text-[#333] text-[13px] m-[15px_0_10px]">
              Forget Your Password
            </a>
            <button
              type="submit"
              className=" bg-[#513da8] text-white text-[12px] py-[10px] px-[45px] border border-solid border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[1000] rounded-[150px_0_0_100px]">
          <div className="toggle text-white bg-[#512da8] h-full bg-gradient-to-r from-[#5c6bc0] to-[#512da8] relative left-[-100%] w-[200%] translate-x-0">
            <div className="toggle-panel toggle-left flex items-center justify-center flex-col py-0 px-[30px] text-center top-0 absolute w-1/2 h-full translate-x-[-200%]">
              <h1 className="text-2xl font-[500]">Welcome Back!</h1>
              <p className="text-[14px] leading-[20px] tracking-[0.3px] my-[20px] mx-0">
                {" "}
                Enter your personal details to use all of site features{" "}
              </p>
              <button
                onClick={signInFunction}
                className="Hidden text-white bg-[#513da8] text-[12px] py-[10px] px-[45px] border border-solid border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                id="login"
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right flex items-center justify-center flex-col py-0 px-[30px] text-center top-0 absolute w-1/2 h-full right-0 translate-x-0">
              <h1 className="text-2xl font-[500]">Hello, Friend!</h1>
              <p className="text-[14px] leading-[20px] tracking-[0.3px] my-[20px] mx-0">
                {" "}
                Resister with your personal details to use all of site features{" "}
              </p>
              <button
                onClick={signUpFunction}
                className="Hidden text-white bg-[#513da8] text-[12px] py-[10px] px-[45px] border border-solid border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                id="resister"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
