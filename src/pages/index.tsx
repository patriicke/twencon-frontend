import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./404/PageNotFound";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Chat from "./Chat";
import Home from "./Home";
import { AppContext, socket } from "./../context/appContext";
import VerificationCode from "./Verification/VerificationCode";
import { Success } from "./success/Success";

const Pages: React.FC = () => {
  const [rooms, setRooms] = useState<[]>([]);
  const [currentRoom, setCurrentRoom] = useState<[]>([]);
  const [members, setMembers] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const [privateMemberMessages, setPrivateMemberMessages] = useState<[]>([]);
  const [newMessages, setNewMessages] = useState<[]>([]);
  return (
    <AppContext.Provider
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
        setNewMessages
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="verification" element={<VerificationCode />} />
          <Route path="success" element={<Success />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};
export default Pages;
