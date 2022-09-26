import React, { createContext, useContext, useState } from "react";
import { socket } from "../../context/chatContext";
import HomePageContext from "../../context/HomePageContext";
import PostComponent from "./PostComponent";
import SuggestionComponent from "./SuggestionComponent";

const HomeComponent: React.FC = () => {
  const { posts, setPosts } = useContext<any>(HomePageContext);
  try {
    socket.off("updated-posts").on("updated-posts", (data: any) => {
      const newState = posts.filter((post: any) => {
        return post._id == data?.post?._id;
      });
      setPosts(newState);
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="flex h-full items-center justify-center">
      <PostComponent />
      <SuggestionComponent />
    </div>
  );
};

export default HomeComponent;
