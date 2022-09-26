import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Home from "./Home";
import HomePageContext from "../../context/HomePageContext";
export const MainHome: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [showPost, setShowPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  return (
    <>
      {localStorage.getItem("acc_token") == null ? (
        <Dashboard />
      ) : (
        <HomePageContext.Provider
          value={{
            current,
            setCurrent,
            showPost,
            setShowPost,
            posts,
            setPosts
          }}
        >
          <Home />
        </HomePageContext.Provider>
      )}
    </>
  );
};

export default MainHome;
