import React, { useState } from "react";
import Chat from "./Chat/Chat";
import Details from "./Details/Details";
import SideBar from "./SideBar/SideBar";
import { ChatContext, chatSocket } from "../../context/chatContext";
const Messages: React.FC = () => {
  const [rooms, setRooms] = useState<[]>([]);
  const [currentRoom, setCurrentRoom] = useState<[]>([]);
  const [members, setMembers] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const [privateMemberMessages, setPrivateMemberMessages] = useState<[]>([]);
  const [newMessages, setNewMessages] = useState<[]>([]);
  return (
    <ChatContext.Provider
      value={{
        chatSocket,
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
        setNewMessages
      }}
    >
      <div className="h-full w-full flex">
        <SideBar />
        <Chat />
        <Details />
      </div>
    </ChatContext.Provider>
  );
};

export default Messages;
