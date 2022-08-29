import React, { useEffect, useState } from "react";
import tick from "./../../assets/success/tick.png";
import Twencon from "./../../assets/logo/twencon.svg";
import { Button } from "@mui/material";
export const Success: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    let timer = setTimeout(() => {
      setShow((current) => !current);
    }, 5000);
    return () => clearTimeout(timer);
  }, [show]);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white shadow-lg w-[25em] h-[35em] border p-5 flex flex-col space-y-4">
        <div className="flex items-center justify-center">
          <img src={Twencon} className="w-28" />
        </div>
        <div className="flex items-center justify-center pt-3">
          <img src={tick} className="w-32" />
        </div>
        <div className="flex space-x-1 items-center justify-center">
          <h1 className="text-xl">Welcome to </h1>
          <img src={Twencon} className="w-20" />
          <p className="flex items-end justify-end text-2xl">!</p>
        </div>
        <div>
          <p className={`flex items-center justify-center text-center text-md`}>
            {show
              ? "You can now start posting videos and images and chat with your friends and family!"
              : "Your group management is no longer a problem now!"}
          </p>
        </div>
        <div className="py-3">
          <Button variant="contained" className="bg-light-blue w-full">
            UPLOAD YOUR PROFILE IMAGE
          </Button>
        </div>
        <div className="py-3 flex items-center justify-center">
          <Button variant="contained" className="bg-light-blue w-2/5">
            SKIP FOR NOW
          </Button>
        </div>
      </div>
    </div>
  );
};
