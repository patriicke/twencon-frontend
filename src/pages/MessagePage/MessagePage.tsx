import React, { useContext, useEffect } from "react";
import Messages from "../../components/Messages/Messages";
import HomePageContext from "../../context/HomePageContext";

const MessagesPage: React.FC = () => {
  const { setCurrent } = useContext<any>(HomePageContext);
  document.title = "Twencon Messages";
  useEffect(() => {
    setCurrent(3);
  }, []);
  return <Messages />;
};

export default MessagesPage;
