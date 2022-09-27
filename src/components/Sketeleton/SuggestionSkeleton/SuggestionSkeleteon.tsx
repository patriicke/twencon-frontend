import { Skeleton } from "@mui/material";
import React from "react";

const SuggestionSkeleteon: React.FC = () => {
  return (
    <div className="hidden w-2/5 border md:flex items-center justify-center h-full">
      <div className="h-full w-4/5 flex flex-col gap-2">
        <h1>Suggestions for you</h1>
        {Array(10)
          .fill("")
          .map((data, index) => {
            return <Skeleton variant="rectangular" className="h-[2.8em] rounded-md" key={index}/>;
          })}
      </div>
    </div>
  );
};

export default SuggestionSkeleteon;
