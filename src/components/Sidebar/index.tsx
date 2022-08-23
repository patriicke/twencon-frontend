import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import { useLogoutUserMutation } from "./../../services/appApi";
import { addNotifications, resetNotifications } from "../../features/userSlice";
const Sidebar: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const {
    socket,
    members,
    setMembers,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
    setPrivateMemberMessages
  } = useContext<any>(AppContext);
  socket.off("new-user").on("new-user", (payload: any) => {
    setMembers(payload);
  });
  const joinRoom = (room: any, isPublic = true) => {
    socket.emit("join_room", room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMessages(null);
    }
    //reset nofications
    dispatch(resetNotifications(room));
  };
  socket.off("notifications").on("notifications", (room: any) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });
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
      socket.emit("join_room", "general", "");
      setPrivateMemberMessages(null);
      socket.emit("new-user");
    }
  }, []);
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logoutUser(user);
    //redirect to home page
    window.location.replace("/");
  };
  const orderIds = (id1: any, id2: any) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };
  const handlePrivateMemberMessage = (member: any) => {
    setPrivateMemberMessages(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };
  return (
    <div className="hidden md:block w-1/5">
      <figure className="md:fbg-slate-100 rounded-xl dark:bg-slate-800 border">
        <img
          className="w-20 h-20 rounded-full mx-auto border"
          src={user?.picture}
          alt=""
        />
        <div className="pt-3 text-center space-y-4">
          <div className="text-sky-500 dark:text-sky-400">{user?.name}</div>
        </div>
      </figure>
      <h1 className="text-[1.3em] font-semibold">Available rooms</h1>
      <ul>
        {(rooms as []).map((room, index) => {
          return (
            <li
              key={index}
              className={`text-red-500 p-2 cursor-pointer flex items-center justify-between border ${
                room === currentRoom ? "border bg-slate-200" : ""
              }`}
              onClick={() => {
                joinRoom(room);
              }}
            >
              <p>{room} </p>
              {user.newMessages[room] != null ? (
                <p
                  className={`bg-blue-500 w-5 h-5 text-white flex items-center justify-center rounded-full text-[0.8em] ${user.newMessages}`}
                >
                  {user.newMessages[room]}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
      <h1 className="text-[1.3em] font-semibold">Members</h1>
      <ul className="flex flex-col space-y-2">
        {(members as []).map((data: any, index) => {
          {
          }
          return (
            <li
              key={index}
              className={`border p-2 text-red-500 cursor-pointer flex justify-between items-center 
              ${
                (currentRoom as string).includes(data._id)
                  ? "border bg-slate-200"
                  : ""
              } ${user.name == data.name ? "hidden" : ""}
              `}
              onClick={() => {
                handlePrivateMemberMessage(data);
              }}
            >
              <div className="flex items-center space-x-1">
                <img
                  src={data.picture}
                  className="w-14 h-14 border rounded-full"
                />
                <p>{data.name}</p>
              </div>
              {user.newMessages[orderIds(data._id, user._id)] != null ? (
                <p
                  className={`bg-blue-500 w-5 h-5 text-white flex items-center justify-center rounded-full text-[0.8em] ${user.newMessages}`}
                >
                  {user.newMessages[orderIds(data._id, user._id)]}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-center mt-3">
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
