import React, { useContext, useEffect } from "react";
import NotificatiosComponent from "../../components/NotificationComponent/NotificationsComponent";
import HomePageContext from "../../context/HomePageContext";
const NotificationsPages: React.FC = () => {
  const { setCurrent } = useContext<any>(HomePageContext);
  document.title = "Twencon";
  useEffect(() => {
    setCurrent(2);
  }, []);
  return <NotificatiosComponent />;
};

export default NotificationsPages;
