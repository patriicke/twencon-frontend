import React, { createContext, useState } from "react";
import PostComponent from "./PostComponent";
import SuggestionComponent from "./SuggestionComponent";

const HomeComponent: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <PostComponent />
      <SuggestionComponent />
    </div>
  );
};

export default HomeComponent;
