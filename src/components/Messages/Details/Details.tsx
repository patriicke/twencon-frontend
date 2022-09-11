import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import ChatMembers from "./ChatMembers";
import SharedFiles from "./SharedFiles";
import { ChatContext } from "../../../context/chatContext";
const Details: React.FC = () => {
  const chatDetails: string[] = ["Chat Members", "Shared Files"];
  const [current, setCurrent] = useState<number>(0);
  const { showTabs, setShowTabs } = useContext<any>(ChatContext);
  return (
    <div
      className={`h-full ${
        showTabs === "details" ? "block w-full" : "hidden"
      } md:w-1/4  md:block `}
    >
      <div className="h-[8%] w-full flex relative">
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
        <div className="absolute h-full flex items-center pb-1 md:hidden">
          <Button
            className="text-[0.9em] text-red-500"
            onClick={() => setShowTabs("chat")}
          >
            BACK
          </Button>
        </div>
      </div>
      <div className="h-[92%] w-full">
        <div className={`${current === 0 ? "block" : "hidden"}`}>
          <ChatMembers />
        </div>
        <div className={`${current === 1 ? "block" : "hidden"}`}>
          <SharedFiles />
        </div>
      </div>
    </div>
  );
};

export default Details;
