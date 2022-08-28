import React from "react";
import { Link } from "@mui/material";
import Twencon from "./../../assets/logo/twencon.svg";
const PageNotFound: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col space-y-2 ">
      <p className="text-red-500 text-2xl">404 Page Not Found!</p>
      <Link href="/">Go back to home</Link>
      <div className="absolute bottom-10">
        <img src={Twencon} className="w-40"/>
      </div>
    </div>
  );
};
export default PageNotFound;
