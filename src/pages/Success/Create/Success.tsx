import React, { useEffect, useState } from "react";
import tick from "./../../../assets/success/tick.png";
import Twencon from "./../../../assets/logo/twencon.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Person } from "@mui/icons-material";
import { useUserData } from "../../../hooks";
import { userData as userDataAction } from "../../../features/user/userSlice";
const Success: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.user.userData);
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  useEffect(() => {
    let timer = setTimeout(() => {
      setShow((current) => !current);
    }, 5000);
    return () => clearTimeout(timer);
  }, [show]);
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
  }, []);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white shadow-lg w-[25em] h-[35em] border p-5 pt-10 flex flex-col space-y-3 relative">
        <div className="flex items-center justify-center absolute -top-10 z-50 left-[42%]">
          <img src={tick} className="w-20" />
        </div>
        <div className="flex items-center justify-center">
          <img src={Twencon} className="w-28" />
        </div>
        <div className="flex items-center justify-center pb-7 relative ">
          <div className="border border-gray-700 border-opacity-70 rounded-full p-1 ">
            <Person className="text-[4.5em]" />
          </div>
          <Button
            className="absolute -bottom-2  bg-light-blue text-[0.7em]"
            variant="contained"
          >
            UPLOAD IMAGE
          </Button>
        </div>
        <h1 className="text-center text-md font-medium pt-2">
          {userData?.fullname}
        </h1>
        <div className="flex space-x-1 items-center justify-center">
          <h1 className="text-xl">Welcome to </h1>
          <img src={Twencon} className="w-24" />
          <p className="flex items-end justify-end text-2xl">!</p>
        </div>
        <div>
          <p className={`flex items-center justify-center text-center text-md`}>
            {show
              ? "You can now start posting videos and images and chat with your friends and family!"
              : "Your group management is no longer a problem now!"}
          </p>
        </div>
        <div className="py-1">
          <Button variant="contained" className="bg-light-blue w-full">
            CLICK HERE TO UPLOAD YOUR PROFILE IMAGE
          </Button>
        </div>
        <div className="py-1 flex items-center justify-center">
          <Button
            variant="contained"
            className="bg-light-blue w-2/5"
            onClick={() => {
              navigate("/");
            }}
          >
            SKIP FOR NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
