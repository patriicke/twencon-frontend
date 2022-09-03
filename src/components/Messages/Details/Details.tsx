import { Button } from "@mui/material";
import React, { useState } from "react";
import ChatMembers from "./ChatMembers";
import SharedFiles from "./SharedFiles";

const Details: React.FC = () => {
  const chatDetails: string[] = ["Chat Members", "Shared Files"];
  const [current, setCurrent] = useState<number>(0);
  return (
    <div className="w-1/4 h-full ">
      <div className="h-[8%] w-full flex">
        {chatDetails.map((data, index) => {
          return (
            <div
              className={`w-1/2 flex items-center justify-center ${
                current == index ? "border-b-4" : ""
              } border-light-blue`}
              key={index}
              onClick={() => setCurrent(index)}
            >
              <Button className="h-full w-full">{data}</Button>
            </div>
          );
        })}
      </div>
      <div className="h-[92%] w-full">
        {current === 0 && <ChatMembers />}
        {current === 1 && <SharedFiles />}
      </div>
    </div>
  );
};

export default Details;
