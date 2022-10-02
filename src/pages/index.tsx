import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./404/PageNotFound";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home/Home";
import Dashboard from "./Home/Dashboard";
import VerificationCode from "./Verification/Create/VerificationCode";
import Success from "./Success/Create/Success";
import ResetPassword from "./Reset/ResetPassword";
import VerificationResetPwd from "./Verification/Reset/VerificationResetPwd";
import ResetSuccess from "./Success/Reset/ResetSuccessfull";
import EnterNewPasword from "./Reset/EnterNewPasword";
import UserPage from "./User/UserPage";
import PostPage from "./PostPage/PostPage";
import NotificationsPages from "./Notifications/NotificationsPages";
import AllHomePagesComponent from "../components/AllHomePagesCompoinet/AllHomePagesComponent";
import FavoritePage from "./Favorite/FavoritePage";
import MessagesPage from "./MessagePage/MessagePage";
const Pages: React.FC = () => {
  return (
    <Router>
      <Routes>
        {[
          "/",
          "/user/:username",
          "/post/:postId",
          "/favorite",
          "/notifications",
          "/messages"
        ].map((path: string, index) => {
          return (
            <Route
              key={index}
              path={path}
              element={
                localStorage.getItem("acc_token") == null ? (
                  <>
                    <Dashboard />
                  </>
                ) : (
                  <AllHomePagesComponent
                    Component={
                      path == "/" ? (
                        <Home />
                      ) : path == "/user/:username" ? (
                        <UserPage />
                      ) : path == "/post/:postId" ? (
                        <PostPage />
                      ) : path == "/favorite" ? (
                        <FavoritePage />
                      ) : path == "/notifications" ? (
                        <NotificationsPages />
                      ) : (
                        <MessagesPage />
                      )
                    }
                  />
                )
              }
            />
          );
        })}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/create/verification" element={<VerificationCode />} />
        <Route path="/reset/verification" element={<VerificationResetPwd />} />
        <Route path="/create/success" element={<Success />} />
        <Route path="/reset/success" element={<ResetSuccess />
      } />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/password/reset/new" element={<EnterNewPasword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
export default Pages;
