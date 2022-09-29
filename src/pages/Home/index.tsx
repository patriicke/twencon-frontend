import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Home from "./Home";
import HomePageContext from "../../context/HomePageContext";
export const MainHome: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [showPost, setShowPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    if (document.location.href.includes("/post")) setCurrent(5);
    else if (document.location.href.includes("/user")) setCurrent(4);
    else {
      if (sessionStorage.getItem("current") == "4") {
        setCurrent(0);
      } else {
        setCurrent(Number(sessionStorage.getItem("current")));
      }
    }
  }, [document.location.href]);
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
            setPosts,
            users,
            setUsers
          }}
        >
          <Home />
        </HomePageContext.Provider>
      )}
    </>
  );
};

export default MainHome;
