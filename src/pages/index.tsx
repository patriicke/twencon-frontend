import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./404/PageNotFound";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Chat from "./Chat";
import Home from "./Home";

const Pages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
export default Pages;
