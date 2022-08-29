import React, { useEffect, useState } from "react";
import tick from "./../../../assets/success/tick.png";
import Twencon from "./../../../assets/logo/twencon.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ResetSuccess: React.FC = () => {
  const navigate = useNavigate();
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
          <h1 className="text-xl">Welcome back again! </h1>
        </div>
        <div>
          <p className="text-center text-lg">
            Your password was reset successfully!
          </p>
        </div>
        <div>
          <Button
            variant="contained"
            className="w-full bg-light-blue"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            GO LOGIN AGAIN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
