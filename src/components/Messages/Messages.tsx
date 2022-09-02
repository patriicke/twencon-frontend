import React from "react";
import Chat from "./Chat/Chat";
import Details from "./Details/Details";
import SideBar from "./SideBar/SideBar";

const Messages: React.FC = () => {
  return (
    <div className="h-full w-full flex">
      <SideBar />
      <Chat />
      <Details />
    </div>
  );
};

export default Messages;
