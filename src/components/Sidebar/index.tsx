import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLoginUserMutation } from "./../../services/appApi";
const Sidebar: React.FC = () => {
  const rooms = ["first room", "second room", "third room"];
  const user = useSelector((state: any) => state.user);
  const [logoutUser] = useLoginUserMutation();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logoutUser(user);
    //redirect to home page
    window.location.replace("/");
  };
  return (
    <div className="hidden md:block w-1/5">
      <figure className="md:fbg-slate-100 rounded-xl dark:bg-slate-800 border">
        <img
          className="w-20 h-20 rounded-full mx-auto border"
          src={user.picture}
          alt=""
        />
        <div className="pt-3 text-center space-y-4">
          <div className="text-sky-500 dark:text-sky-400">{user.name}</div>
        </div>
      </figure>
      <h1>Available rooms</h1>
      <ul>
        {rooms.map((data, index) => {
          return <li key={index}>{data}</li>;
        })}
      </ul>
      <div className="flex items-center justify-center">
        <Button
          variant="contained"
          className="bg-red-500"
          onClick={handleLogout}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
