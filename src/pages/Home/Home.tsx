import React, { useContext, useEffect } from "react";
import HomeComponent from "../../components/Home/HomeComponent";
import HomePageContext from "../../context/HomePageContext";

const Home: React.FC = () => {
  const { setCurrent } = useContext<any>(HomePageContext);
  document.title = "Twencon";
  useEffect(() => {
    setCurrent(0);
  }, []);
  return <HomeComponent />;
};

export default Home;
