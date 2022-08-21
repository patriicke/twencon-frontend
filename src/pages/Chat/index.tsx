import React from "react";
import Chatform from "../../components/Chatform";
import Sidebar from "../../components/Sidebar";
import User from "../../components/User";

const Chat: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-row">
      <Sidebar />
      <Chatform />
      <User />
    </div>
  );
};

export default Chat;
