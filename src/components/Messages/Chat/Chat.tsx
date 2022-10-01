import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Call,
  InsertEmoticon,
  MoreHoriz,
  VideoCall
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { ChatContext } from "../../../context/chatContext";
import MessageSkeleton from "../../Sketeleton/MessageSkeleon/MessageSkeleton";
import Person from "./../../../assets/person/person.png";
import { formatUrl, poster } from "../../../hooks";
import HomePageContext from "../../../context/HomePageContext";
import PhotoSkeleton from "../../Sketeleton/PhotoSkeleton/PhotoSkeleton";
const Chat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user.userData);
  const [message, setMessage] = useState<string>("");
  const { users } = useContext<any>(HomePageContext);
  const {
    socket,
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
    socket.emit(
      "message-room",
      roomId,
      message.trimEnd().trimStart(),
      user?._id,
      time,
      todayDate
    );
    setMessage("");
  };
  useEffect(() => {
    socket.off("room-messages").on("room-messages", (roomMessages: any) => {
      setMessages(roomMessages);
      setLoading(false);
    });
  }, [socket]);
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
      className={`${
        showTabs === "chat" ? "w-full" : "hidden"
      } bg-red-3 md:w-[70%] xl:w-[50%]  flex flex-col relative border-r overflow-hidden border-t`}
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
                <div className="hidden rounded-full border-2 p-2 px-[1.1rem] text-[1.4em] font-bold text-black md:flex items-center justify-center">
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
                {privateMemberMessages.profile ? (
                  <img
                    src={
                      privateMemberMessages.profile == "icon"
                        ? Person
                        : formatUrl(privateMemberMessages.profile)
                    }
                    className=" w-10 md:w-14 md:h-14 border rounded-full"
                  />
                ) : (
                  <PhotoSkeleton />
                )}
                <p>{privateMemberMessages?.fullname}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-3">
          <Call className="md:text-[1.7em] cursor-pointer" />
          <VideoCall className="md:text-[1.7em] cursor-pointer" />
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
            <div key={index} className="flex flex-col gap-[0.2em]">
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
                        poster(data?.from, users)?.fullname === user?.fullname
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-2 break-words max-w-[70%] flex gap-1  ${
                          poster(data?.from, users)?.fullname !==
                            user?.fullname &&
                          (messagesByDate[index - 1] as any)?.time ===
                            (messagesByDate[index] as any)?.time &&
                          (messagesByDate[index - 1] as any)?.from ===
                            (messagesByDate[index] as any)?.from &&
                          "ml-11"
                        }`}
                      >
                        {poster(data?.from, users)?.fullname !==
                          user?.fullname && (
                          <div>
                            <div
                              className={`border rounded-full w-[2.7em] 
                                ${
                                  poster(data?.from, users)?.fullname !==
                                    user?.fullname &&
                                  (messagesByDate[index - 1] as any)?.time ===
                                    (messagesByDate[index] as any)?.time &&
                                  (messagesByDate[index - 1] as any)?.from ===
                                    (messagesByDate[index] as any)?.from &&
                                  "hidden"
                                }
                                `}
                            >
                              {poster(data?.from, users)?.profile ? (
                                <img
                                  src={
                                    poster(data?.from, users)?.profile ===
                                    "icon"
                                      ? Person
                                      : formatUrl(
                                          poster(data?.from, users)?.profile
                                        )
                                  }
                                  alt=""
                                  className="rounded-full "
                                />
                              ) : (
                                <PhotoSkeleton />
                              )}
                            </div>
                          </div>
                        )}
                        <div>
                          {!privateMemberMessages && (
                            <span
                              className={`px-2 opacity-60 font-light
                            ${
                              poster(data?.from, users)?.email !==
                                user?.email &&
                              (messagesByDate[index - 1] as any)?.time ===
                                (messagesByDate[index] as any)?.time &&
                              (messagesByDate[index - 1] as any)?.from ===
                                (messagesByDate[index] as any)?.from &&
                              "hidden"
                            }
                            ${
                              poster(data?.from, users)?.username ===
                                user?.username && "hidden"
                            }
                            `}
                            >
                              {poster(data?.from, users)?.username}
                            </span>
                          )}
                          <span
                            id="message"
                            className={`${
                              poster(data?.from, users)?.fullname ===
                              user?.fullname
                                ? "bg-[#1877F2] text-white"
                                : "bg-[#E4E6EB]"
                            } text-[1rem] rounded-2xl px-4 py-2 font-light flex flex-col`}
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
        className={`flex space-x-2 px-2 flex-shrink flex-grow bottom-3 right-0 left-0 items-center justify-center h-[10%] border min-h-[4em]`}
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
            <input
              type="text"
              className="w-[100%] text-[1.1em] font-normal  text-black border-[0.15em] outline-none focus:border-blue-500 rounded-md p-2"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message"
            />
          </div>
          <div className="sm:w-[25%] lg:w-[20%] min-w-[6em] flex flex-shrink flex-grow justify-evenly  h-full items-center ">
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
