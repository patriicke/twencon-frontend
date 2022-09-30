import React, { useContext, useEffect } from "react";
import Favorite from "../../components/FavoriteComponent/FavoriteComponent";
import HomePageContext from "../../context/HomePageContext";
const FavoritePage: React.FC = () => {
  const { setCurrent } = useContext<any>(HomePageContext);
  document.title = "Twencon Favorite";
  useEffect(() => {
    setCurrent(1);
  }, []);
  return <Favorite />;
};
export default FavoritePage;
