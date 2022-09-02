import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./404/PageNotFound";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home";
import { AppContext, socket } from "../context/chatContext";
import VerificationCode from "./Verification/Create/VerificationCode";
import Success from "./Success/Create/Success";
import ResetPassword from "./Reset/ResetPassword";
import VerificationResetPwd from "./Verification/Reset/VerificationResetPwd";
import ResetSuccess from "./Success/Reset/ResetSuccessfull";
import EnterNewPasword from "./Reset/EnterNewPasword";

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
          <Route path="/create/verification" element={<VerificationCode />} />
          <Route
            path="/reset/verification"
            element={<VerificationResetPwd />}
          />
          <Route path="/create/success" element={<Success />} />
          <Route path="/reset/success" element={<ResetSuccess />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/password/reset/new" element={<EnterNewPasword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};
export default Pages;
