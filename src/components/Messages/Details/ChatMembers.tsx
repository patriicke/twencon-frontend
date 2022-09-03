import { Person } from "@mui/icons-material";
import React, { useContext } from "react";
import { ChatContext } from "../../../context/chatContext";

const ChatMembers: React.FC = () => {
  const { members } = useContext<any>(ChatContext);
  return (
    <div className="w-full h-full overflow-auto">
      <ul className="flex flex-col space-y-2">
        {(members as []).map((data: any, index) => {
          {
          }
          return (
            <li
              key={index}
              className={`border p-2 cursor-pointer flex justify-between items-center 
              `}
            >
              <div className="flex items-center space-x-2">
                {data?.profile === "icon" ? (
                  <div className="rounded-full border-2">
                    <Person className="text-black text-[3rem]" />
                  </div>
                ) : (
                  <img
                    src={data?.profile}
                    className="w-14 h-14 border rounded-full"
                  />
                )}
                <p>{data?.fullname}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMembers;
