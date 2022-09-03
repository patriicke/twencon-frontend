import { Person } from "@mui/icons-material";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ChatContext } from "../../../context/chatContext";

const ChatMembers: React.FC = () => {
  const user = useSelector((state: any) => state.user.userData);
  const { members, privateMemberMessages } = useContext<any>(ChatContext);
  return (
    <div className="w-full h-full overflow-auto">
      {!privateMemberMessages ? (
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
                  <p className="opacity-60">
                    {data?.fullname}
                    {user?.fullname == data?.fullname && " (You)"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          <li
            className={`border p-2 cursor-pointer flex justify-between items-center 
              `}
          >
            <div className="flex items-center space-x-2">
              {user?.profile === "icon" ? (
                <div className="rounded-full border-2">
                  <Person className="text-black text-[3rem]" />
                </div>
              ) : (
                <img
                  src={user?.profile}
                  className="w-14 h-14 border rounded-full"
                />
              )}
              <p className="opacity-60">
                {user?.fullname} {" (You)"}
              </p>
            </div>
          </li>
          <li
            className={`border p-2 cursor-pointer flex justify-between items-center 
              `}
          >
            <div className="flex items-center space-x-2">
              {privateMemberMessages?.profile === "icon" ? (
                <div className="rounded-full border-2">
                  <Person className="text-black text-[3rem]" />
                </div>
              ) : (
                <img
                  src={privateMemberMessages?.profile}
                  className="w-14 h-14 border rounded-full"
                />
              )}
              <p className="opacity-60">{privateMemberMessages?.fullname}</p>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ChatMembers;
