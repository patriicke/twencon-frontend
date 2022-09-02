import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Call,
  Info,
  InsertEmoticon,
  Person,
  VideoCall
} from "@mui/icons-material";
import { Button, Skeleton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { ChatContext } from "../../../context/chatContext";
import MessageSkeleton from "../../Sketeleton/MessageSkeleon/MessageSkeleton";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const allData = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userData);
  const [message, setMessage] = useState("");
  const {
    chatSocket,
    currentRoom,
    setMessages,
    messages,
    privateMemberMessages
  } = useContext<any>(ChatContext);
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
    chatSocket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };
  useEffect(() => {
    chatSocket.off("room-messages").on("room-messages", (roomMessages: any) => {
      setMessages(roomMessages);
      setLoading(false);
    });
    console.log(messages);
  }, [chatSocket]);
  const element: any = useRef(null);
  useEffect(() => {
    element.current.scrollTop = element.current.scrollHeight;
  }, [messages]);
  const [showEmojiFile, setShowEmojiFile] = useState(false);
  const onEmojiClick = (event: any, emojiObject: any) => {
    let msg = message;
    msg = msg + `${emojiObject.emoji}`;
    setMessage(msg);
  };
  const emojiElement: any = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", () => {
      if (!emojiElement.current?.contains(event?.target))
        setShowEmojiFile(false);
    });
  }, [showEmojiFile]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  const formatDate = (date: string): string => {
    let dateArray: string[] = date.split("/");
    const month: number = Number(dateArray[0]) - 1;
    const day = dateArray[1];
    const year = dateArray[2];
    return `${day} ${months[month]} ${year}`;
  };
  return (
    <div className="h-[100%] w-[70%] xl:w-[50%] hidden md:block relative border-r overflow-hidden">
      <div className="bg-gray-100 h-[8%] flex px-5 items-center justify-between shadow-xl">
        <div className="text-[0.8em] font-normal flex items-center space-x-4">
          <Person className="text-[3em] rounded-full bg-white" />
          <p></p>
        </div>
        <div className="flex space-x-3">
          <Call className="text-[1.7em] cursor-pointer" />
          <VideoCall className="text-[1.7em] cursor-pointer" />
        </div>
      </div>
      <div
        className="h-[82%] w-full flex-shrink flex flex-col overflow-auto p-2 scroll-smooth"
        ref={element}
      >
        {loading ? (
          <MessageSkeleton />
        ) : (
          (messages as []).map(({ _id, messagesByDate }, index: number) => (
            <div key={index} className="flex flex-col gap-[0.1em]">
              {(messagesByDate as []).map((data: any, index) => {
                return (
                  <div key={index}>
                    {(messagesByDate[index - 1] as any)?.time !==
                    (messagesByDate[index] as any)?.time ? (
                      <div className="text-[0.8rem] text-center font-medium opacity-50">
                        {`${formatDate(_id)} ${data?.time}`}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div
                      key={index}
                      className={`flex ${
                        data?.from?.fullname === user?.fullname
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-2 break-words max-w-[50%] flex gap-1`}
                      >
                        {data?.from?.fullname !== user?.fullname && (
                          <>
                            {data?.from?.profile === "icon" ? (
                              <div className="border rounded-full">
                                <Person className="text-[2em]" />
                              </div>
                            ) : (
                              <img
                                src={data?.from?.profile}
                                className={`${
                                  (messagesByDate[index - 1] as any)?.time !==
                                  (messagesByDate[index] as any)?.time
                                    ? ""
                                    : "hidden"
                                } w-10 h-10 rounded-full border`}
                              />
                            )}
                          </>
                        )}

                        <div
                          className={`${
                            data?.from?.fullname === user?.fullname
                              ? "bg-[#1877F2] text-white  "
                              : "bg-[#E4E6EB]"
                          } text-[1rem] rounded-2xl px-4 py-2 font-light`}
                        >
                          {data?.content}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
      <div
        className={`flex space-x-2 px-2 flex-shrink flex-grow bottom-3 right-0 left-0 items-center justify-center h-[10%] border `}
      >
        <div className="min-w-[2.5em] h-full sm:min-w-[0em] w-[7%] rounded-l-[2em] flex items-center justify-center">
          <div className="p-2 rounded-full h-[2.5em] w-[2.5em] flex items-center justify-center relative">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEmojiFile((current) => !current);
              }}
            >
              <InsertEmoticon className="text-gray-700 text-[2em]" />
            </div>
            {showEmojiFile && (
              <div className="absolute bottom-[4em] left-0" ref={emojiElement}>
                <Picker
                  onEmojiClick={onEmojiClick}
                  pickerStyle={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        </div>
        <form
          className="flex w-[95%] h-full  items-center relative justify-center"
          onSubmit={handleSubmit}
        >
          <div className="h-full w-full flex items-center relative justify-center">
            <TextField
              type="text"
              placeholder="Send a message"
              className="w-[100%] text-[1.1em] font-light text-black border outline-none border-black rounded-md p-2"
              size="medium"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              name="none"
              autoComplete="off"
            />
          </div>
          <div className="sm:w-[25%] lg:w-[20%] flex flex-shrink flex-grow justify-evenly  h-full items-center ">
            <i className="fa-solid fa-microphone text-[1.3em] cursor-pointer"></i>
            <i className="fa-solid fa-paperclip text-[1.3em] cursor-pointer"></i>
            <button type="submit">
              <i className="fa-solid fa-paper-plane text-[1.2em] text-[#5c07fc] cursor-pointer"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
