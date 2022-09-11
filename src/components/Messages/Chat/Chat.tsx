import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Call,
  InsertEmoticon,
  MoreHoriz,
  Person,
  VideoCall
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { ChatContext } from "../../../context/chatContext";
import MessageSkeleton from "../../Sketeleton/MessageSkeleon/MessageSkeleton";

const Chat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user.userData);
  const [message, setMessage] = useState<string>("");
  const {
    chatSocket,
    currentRoom,
    setMessages,
    messages,
    privateMemberMessages,
    showTabs,
    setShowTabs
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
    if (message.trim().length == 0) {
      setMessage("");
      return;
    }
    const today = new Date();
    const minutes: string =
      today.getMinutes() < 10
        ? "0" + today.getMinutes().toString()
        : today.getMinutes().toString();
    const time: string = today.getHours().toString() + ":" + minutes;
    const roomId = currentRoom;
    chatSocket.emit(
      "message-room",
      roomId,
      message.trimEnd().trimStart(),
      user,
      time,
      todayDate
    );
    setMessage("");
  };
  useEffect(() => {
    chatSocket.off("room-messages").on("room-messages", (roomMessages: any) => {
      setMessages(roomMessages);
      setLoading(false);
    });
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
  const [messageNotifications, setMessageNotifications] = useState<number>(0);
  useEffect(() => {
    let count = 0;
    for (const room in user?.newMessages) {
      count += user?.newMessages[room];
    }
    setMessageNotifications(count);
  }, [user]);
  return (
    <div
      className={`h-[100%] ${
        showTabs === "chat" ? "w-full" : "hidden"
      } md:w-[70%] xl:w-[50%]  md:block relative border-r overflow-hidden`}
    >
      <div className="bg-gray-100 h-[8%] min-h-[3.5em] flex px-5 items-center justify-between shadow-xl relative">
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              setShowTabs("select");
            }}
            className="md:hidden relative"
          >
            <MenuIcon className="text-black text-[2em] cursor-pointer" />
            <span className="absolute text-[0.8em] -top-2 -right-3 bg-blue-500 text-white px-[0.45em] rounded-full">
              {messageNotifications == 0 ? null : messageNotifications}
            </span>
          </div>
          {!privateMemberMessages ? (
            <>
              <div className="flex space-x-3">
                <div className="rounded-full border-2 p-2 px-[1.1rem] text-[1.4em] font-bold text-black flex items-center justify-center">
                  {(currentRoom as string)[0].toUpperCase()}
                </div>
                <div className="flex items-center">
                  <p className="text-[1rem] ">{currentRoom}</p>
                </div>
                <p className="absolute bottom-0 right-[1.1rem] text-[0.8em] opacity-70 text-light-blue">
                  Public Group
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                {privateMemberMessages.profile === "icon" ? (
                  <div className="rounded-full border-2">
                    <Person className="text-black text-[3rem]" />
                  </div>
                ) : (
                  <img
                    src={privateMemberMessages?.profile}
                    className="w-14 h-14 border rounded-full"
                  />
                )}
                <p>{privateMemberMessages?.fullname}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-3">
          <Call className="text-[1.7em] cursor-pointer" />
          <VideoCall className="text-[1.7em] cursor-pointer" />
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setShowTabs("details")}
          >
            <MoreHoriz />
          </div>
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
                        className={`px-2 break-words max-w-[50%] flex gap-1  ${
                          data?.from?.fullname !== user?.fullname &&
                          (messagesByDate[index - 1] as any)?.time ===
                            (messagesByDate[index] as any)?.time &&
                          (messagesByDate[index - 1] as any)?.from?.email ===
                            (messagesByDate[index] as any)?.from?.email &&
                          "ml-11"
                        }`}
                      >
                        {data?.from?.fullname !== user?.fullname && (
                          <div>
                            {data?.from?.profile === "icon" ? (
                              <div
                                className={`border rounded-full 
                                ${
                                  data?.from?.fullname !== user?.fullname &&
                                  (messagesByDate[index - 1] as any)?.time ===
                                    (messagesByDate[index] as any)?.time &&
                                  (messagesByDate[index - 1] as any)?.from
                                    ?.email ===
                                    (messagesByDate[index] as any)?.from
                                      ?.email &&
                                  "hidden"
                                }
                              `}
                              >
                                <Person className="text-[2.5em] " />
                              </div>
                            ) : (
                              <img
                                src={data?.from?.profile}
                                className={`${
                                  data?.from?.email !== user?.email &&
                                  (messagesByDate[index - 1] as any)?.time ===
                                    (messagesByDate[index] as any)?.time &&
                                  (messagesByDate[index - 1] as any)?.from
                                    ?.email ===
                                    (messagesByDate[index] as any)?.from
                                      ?.email &&
                                  "hidden"
                                } w-10 h-10 rounded-full border`}
                              />
                            )}
                          </div>
                        )}
                        <div>
                          {!privateMemberMessages && (
                            <span
                              className={`px-2 opacity-60 font-light
                            ${
                              data?.from?.email !== user?.email &&
                              (messagesByDate[index - 1] as any)?.time ===
                                (messagesByDate[index] as any)?.time &&
                              (messagesByDate[index - 1] as any)?.from
                                ?.email ===
                                (messagesByDate[index] as any)?.from?.email &&
                              "hidden"
                            }
                            ${
                              data?.from?.username === user?.username &&
                              "hidden"
                            }
                            `}
                            >
                              {data?.from?.username}
                            </span>
                          )}
                          <span
                            id="message"
                            className={`${
                              data?.from?.fullname === user?.fullname
                                ? "bg-[#1877F2] text-white"
                                : "bg-[#E4E6EB]"
                            } text-[1rem] rounded-2xl px-4 py-2 font-light flex flex-col `}
                          >
                            {data?.content}
                          </span>
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
