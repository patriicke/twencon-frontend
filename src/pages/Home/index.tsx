import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Home from "./Home";
import HomePageContext from "../../context/HomePageContext";
export const MainHome: React.FC = () => {
  const [current, setCurrent] = useState<number>(
    sessionStorage.getItem("current")
      ? Number(sessionStorage.getItem("current"))
      : 0
  );
  const [showPost, setShowPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    const previousCurrent = sessionStorage.getItem("current");
    if (previousCurrent) setCurrent(Number(previousCurrent));
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
