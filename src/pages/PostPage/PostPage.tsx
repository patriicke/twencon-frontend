import React, { useContext, useEffect } from "react";
import PostComponent from "../../components/PostComponent/PostComponent";
import HomePageContext from "../../context/HomePageContext";

const PostPage: React.FC = () => {
  const { setCurrent } = useContext<any>(HomePageContext);
  document.title = "Twencon Post";
  useEffect(() => {
    setCurrent(5);
  }, []);
  return <PostComponent />;
};

export default PostPage;
