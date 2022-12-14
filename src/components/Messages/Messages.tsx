import React, { useState } from "react";
import Chat from "./Chat/Chat";
import Details from "./Details/Details";
import SideBar from "./SideBar/SideBar";
import { ChatContext, socket } from "../../context/chatContext";
const Messages: React.FC = () => {
  const [rooms, setRooms] = useState<[]>([]);
  const [currentRoom, setCurrentRoom] = useState<[]>([]);
  const [members, setMembers] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const [privateMemberMessages, setPrivateMemberMessages] = useState<[]>([]);
  const [newMessages, setNewMessages] = useState<[]>([]);
  const [showTabs, setShowTabs] = useState<string>("chat");
  return (
    <ChatContext.Provider
      value={{
        socket,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMessages,
        setPrivateMemberMessages,
        newMessages,
        setNewMessages,
        showTabs,
        setShowTabs
      }}
    >
      <div className="h-full w-full flex delay-100">
        <SideBar />
        <Chat />
        <Details />
      </div>
    </ChatContext.Provider>
  );
};

export default Messages;
