import React, { useContext, useEffect } from "react";
import UserAccount from "../../components/Account/UserAccount";
import HomePageContext from "../../context/HomePageContext";

const UserPage: React.FC = () => {
  const { setCurrent } = useContext<any>(HomePageContext);
  useEffect(() => {
    setCurrent(4);
  }, []);
  return <UserAccount />;
};

export default UserPage;
