import React from "react";
import PostComponent from "./PostComponent";
import SuggestionComponent from "./SuggestionComponent";

const HomeComponent: React.FC = () => {
  return (
    <div className="flex h-full">
      <PostComponent />
      <SuggestionComponent />
    </div>
  );
};

export default HomeComponent;
