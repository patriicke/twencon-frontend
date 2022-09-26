import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./404/PageNotFound";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home";
import VerificationCode from "./Verification/Create/VerificationCode";
import Success from "./Success/Create/Success";
import ResetPassword from "./Reset/ResetPassword";
import VerificationResetPwd from "./Verification/Reset/VerificationResetPwd";
import ResetSuccess from "./Success/Reset/ResetSuccessfull";
import EnterNewPasword from "./Reset/EnterNewPasword";
import Post from "./Post/Post";

const Pages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Home />} />
        <Route path="/post/:postId" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/create/verification" element={<VerificationCode />} />
        <Route path="/reset/verification" element={<VerificationResetPwd />} />
        <Route path="/create/success" element={<Success />} />
        <Route path="/reset/success" element={<ResetSuccess />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/password/reset/new" element={<EnterNewPasword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
export default Pages;
