import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import { useLogoutUserMutation } from "./../../services/appApi";
const Sidebar: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const {
    socket,
    members,
    setMembers,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
    privateMemberMessages,
    setPrivateMemberMessages
  } = useContext<any>(AppContext);
  socket.off("new-user").on("new-user", (payload: any) => {
    setMembers(payload);
  });

  const joinRoom = (room: any, isPublic = true) => {
    socket.emit("join_room", room);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMessages(null);
    }
  };

  const getRooms = async () => {
    try {
      const request = await fetch("http://localhost:5001/rooms", {
        method: "GET"
      });
      const response = await request.json();
      setRooms(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join_room", "general");
      socket.emit("new-user");
    }
  }, []);
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logoutUser(user);
    //redirect to home page
    window.location.replace("/");
  };
  return (
    <div className="hidden md:block w-1/5">
      <figure className="md:fbg-slate-100 rounded-xl dark:bg-slate-800 border">
        <img
          className="w-20 h-20 rounded-full mx-auto border"
          src={user.picture}
          alt=""
        />
        <div className="pt-3 text-center space-y-4">
          <div className="text-sky-500 dark:text-sky-400">{user.name}</div>
        </div>
      </figure>
      <h1 className="text-[1.3em] font-semibold">Available rooms</h1>
      <ul>
        {(rooms as []).map((data, index) => {
          return (
            <li
              key={index}
              className={`text-red-500 px-3 ${""} cursor-pointer ${
                data === currentRoom ? "border bg-slate-200" : ""
              }`}
              onClick={() => {
                joinRoom(data);
              }}
            >
              {data}
            </li>
          );
        })}
      </ul>
      <h1 className="text-[1.3em] font-semibold">Members</h1>
      <ul>
        {(members as []).map((data: any, index) => {
          return (
            <li
              key={index}
              className="border p-2 text-red-500"
              hidden={user.name == data.name}
            >
              {data.name}
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-center">
        <Button
          variant="contained"
          className="bg-red-500"
          onClick={handleLogout}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
