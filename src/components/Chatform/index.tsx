import { InsertEmoticon, Send } from "@mui/icons-material";
import { formControlClasses, Input } from "@mui/material";
import React, { useState, useContext, useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
const Chatform: React.FC = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state: any) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMessages } =
    useContext<any>(AppContext);
  const getFormattedDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month: string = (date.getMonth() + 1).toString();
    month = month.length > 1 ? month : "0" + month;
    let day: string = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return `${month}/${day}/${year}`;
  };
  const todayDate = getFormattedDate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes: string =
      today.getMinutes() < 10
        ? "0" + today.getMinutes().toString()
        : today.getMinutes().toString();
    const time: string = today.getHours().toString() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  socket.off("room-messages").on("room-messages", (roomMessages: any) => {
    setMessages(roomMessages);
    console.log(roomMessages);
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };
  const element: any = useRef(null);
  useEffect(() => {
    element.current.scrollTop = element.current?.scrollHeight;
  }, [messages]);

  const orderIds = (id1: any, id2: any) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  return (
    <div className="bg-white h-screen border shadow-lg flex flex-col w-full md:w-4/5 lg:w-3/5 relative">
      <div
        className="h-[92%] w-full flex-shrink flex flex-col overflow-auto"
        ref={element}
      >
        <div className="text-[1.4em] font-semibold absolute top-0 bg bg-slate-100 z-50 p-2 w-full shadow-2xl">
          {currentRoom}
        </div>
        {(messages as []).map(({ _id, messagesByDate }, index) => {
          return (
            <div key={index}>
              <p>{_id}</p>
              <div className={`flex flex-col space-y-2`}>
                {(messagesByDate as []).map((data: any, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 ${
                        data?.from?.name == user.name
                          ? "self-end "
                          : "self-start flex-row-reverse"
                      }`}
                    >
                      <p>{data.content}</p>
                      <img
                        src={data?.from?.picture}
                        className="w-14 h-14 rounded-full border"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="min-h-[8%] h-[5em] w-full flex items-center border p-1 lg:p-2 border-slate-300"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-full border border-gray-700 rounded-[2em] flex items-center">
          <div className="min-w-[2.5em] h-full sm:min-w-[0em] w-[7%] rounded-l-[2em] flex items-center justify-center">
            <div className="p-2 rounded-full h-[2.5em] w-[2.5em] flex items-center justify-center">
              <InsertEmoticon className="text-gray-700 text-[2em]" />
            </div>
          </div>
          <Input
            disableUnderline={true}
            autoFocus
            placeholder="Type a message"
            value={message}
            size="medium"
            className="w-[84%] h-full flex-shrink flex-grow"
            onChange={handleChange}
          />
          <div className="w-[7%] sm:w-[10%] min-w-[4em] h-full rounded-r-[2em] flex items-center justify-evenly">
            <button
              className="p-2 rounded-full bg-light-blue h-[2.5em] w-[2.5em] flex items-center justify-center"
              type="submit"
            >
              <Send className="text-white" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chatform;
