import React from "react";
import Dashboard from "./Dashboard";
import Home from "./Home";

export const MainHome: React.FC = () => {
  return (
    <>{localStorage.getItem("acc_token") == null ? <Dashboard /> : <Home />}</>
  );
};

export default MainHome;
