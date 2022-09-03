import { Add, Person, Search } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatContext } from "../../../context/chatContext";
import {
  addNotifications,
  resetNotifications
} from "../../../features/user/userSlice";
import { resetNotificationsFromDatabase } from "../../../hooks";

const SideBar: React.FC = () => {
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  const {
    chatSocket,
    members,
    setMembers,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
    setPrivateMemberMessages
  } = useContext<any>(ChatContext);
  chatSocket.off("new-user").on("new-user", (payload: any) => {
    setMembers(payload);
  });
  chatSocket.off("notifications").on("notifications", (room: any) => {
    if (currentRoom !== room) {
      dispatch(addNotifications(room));
    }
  });
  const joinRoom = (room: any, isPublic = true) => {
    chatSocket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMessages(null);
    }
    //Reset All notifications in this room
    dispatch(resetNotifications(room));
    const roomNotifications = user?.newMessages[room];
    if (roomNotifications) {
      resetNotificationsFromDatabase(user?.email, room);
    }
  };
  const getRooms = async () => {
    try {
      const request = await fetch("http://localhost:5001/rooms", {
        method: "GET"
      });
      const response = await request.json();
      setRooms(response);
      joinRoom(response[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      await getRooms();
      setCurrentRoom("general");
      chatSocket.emit("join_room", "general", "");
      setPrivateMemberMessages(null);
      chatSocket.emit("new-user");
    };
    getData();
  }, []);
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
    <div className="w-1/4 h-full border p-3">
      <div className="flex justify-between items-center">
        <div className="font-medium text-[1.3em]">Chats</div>
        <div className="flex  justify-between items-center flex-shrink space-x-1">
          <div className="border p-1 rounded-md">
            <input
              className="border-none outline-none hidden"
              placeholder="Search..."
            />
            <Search className="cursor-pointer" />
          </div>
          <div className="p-1 border rounded-md">
            <Add className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <h1 className="p-1">Groups</h1>
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
                {user?.newMessages[room] != null ? (
                  <p
                    className={`bg-blue-500 w-5 h-5 text-white flex items-center justify-center rounded-full text-[0.8em]
                    `}
                  >
                    {user?.newMessages[room]}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
        <h1 className="pt-2">People</h1>
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
              } ${user?.fullname == data?.fullname ? "hidden" : ""}
              `}
                onClick={() => {
                  handlePrivateMemberMessage(data);
                }}
              >
                <div className="flex items-center space-x-2">
                  {data.profile === "icon" ? (
                    <div className="rounded-full border-2">
                      <Person className="text-black text-[3rem]" />
                    </div>
                  ) : (
                    <img
                      src={data.profile}
                      className="w-14 h-14 border rounded-full"
                    />
                  )}
                  <p>{data?.fullname}</p>
                </div>
                {user?.newMessages[orderIds(data._id, user?._id)] != null ? (
                  <p
                    className={`bg-blue-500 w-5 h-5 text-white flex items-center justify-center rounded-full text-[0.8em] ${user?.newMessages}`}
                  >
                    {user?.newMessages[orderIds(data._id, user._id)]}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
