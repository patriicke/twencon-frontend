import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, useGetPosts, useUserData } from "../../hooks";
import { userDataAction } from "../../features/user/userSlice";
import Logo from "./../../assets/logo/logo.png";
import {
  Apps,
  FavoriteBorder,
  Notifications,
  PagesOutlined,
  Search
} from "@mui/icons-material";
import ChatIcon from "../../components/ChatIcon/ChatIcon";
import Messages from "../../components/Messages/Messages";
import PhotoSkeleton from "../../components/Sketeleton/PhotoSkeleton/PhotoSkeleton";
import Person from "./../../assets/person/person.png";
import HomeComponent from "../../components/Home/HomeComponent";
import UserAccount from "../Account/UserAccount";
import HomePageContext from "../../context/HomePageContext";
import Post from "../Post/Post";
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userData);
  const { current, setCurrent, setUsers, setPosts, users } =
    useContext<any>(HomePageContext);
  const [messageNotifications, setMessageNotifications] = useState<number>(0);
  const [searchElementShow, setSearchElementShow] = useState<boolean>(false);
  const searchElement = useRef<any>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [foundUsers, setFoundUsers] = useState<any>([]);
  const [noUserFound, setNoUserFound] = useState<boolean>(false);
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
    getAllUsers(setUsers);
    // useGetPosts(setPosts);
  }, []);
  useEffect(() => {
    const title: string = "Twencon";
    switch (current) {
      case 0:
        document.title = title;
        break;
      case 1:
        document.title = `${title} Favorite`;
        break;
      case 2:
        document.title = `${title} Notification`;
        break;
      case 3:
        document.title = `${title} Chats`;
        break;
      case 4:
        document.title = `${title} Account`;
        break;
      default:
        document.title = "Twencon";
    }
  }, [current]);
  useEffect(() => {
    let count = 0;
    for (const room in user?.newMessages) {
      count += user?.newMessages[room];
    }
    if (count != 0)
      document
        .querySelector("[name=logo]")
        ?.setAttribute("href", "./src/assets/logo/LogoNotification.png");
    else
      document
        .querySelector("[name=logo]")
        ?.setAttribute("href", "./src/assets/logo/logo.png");
    setMessageNotifications(count);
  }, [user]);
  const navigations: {
    icons: any;
    name: string;
  }[] = [
    {
      icons: <Apps className="text-[2em]" />,
      name: "Home"
    },
    {
      name: "Favorite",
      icons: <FavoriteBorder className="text-[2em]" />
    },
    {
      icons: <Notifications className="text-[2em]" />,
      name: "Notifications"
    },
    {
      icons: (
        <div className="relative">
          <ChatIcon className="w-8" />
          <span className="absolute text-[0.8em] -top-[0.4em] -right-3 bg-blue-500 text-white px-[0.45em] rounded-full">
            {messageNotifications == 0 ? null : messageNotifications}
          </span>
        </div>
      ),
      name: "Messages"
    },
    {
      icons: (
        <>
          {user?.profile == "icon" ? (
            <div className="border-2 rounded-full p-[0.1em]">
              <img src={Person} className="w-10 rounded-full" />
            </div>
          ) : user?.profile ? (
            <div className="border-2 rounded-full p-[0.1em]">
              <img src={user?.profile} className="w-10 rounded-full" />
            </div>
          ) : (
            <PhotoSkeleton />
          )}
        </>
      ),
      name: "Account"
    }
  ];
  useEffect(() => {
    const click = () => {
      if (!searchElement?.current?.contains(event?.target))
        setSearchElementShow(false);
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  });
  useEffect(() => {
    if (searchString == "") return;
    let fusers = users?.filter((user: any) => {
      return (
        user?.fullname?.toLowerCase()?.includes(searchString?.toLowerCase()) ||
        user?.username?.toLowerCase()?.includes(searchString?.toLowerCase())
      );
    });
    if (fusers?.length < 1) {
      setFoundUsers([]);
      return setNoUserFound(true);
    }
    setFoundUsers(fusers);
    return setNoUserFound(false);
  }, [searchString]);
  return (
    <div className="h-screen relative overflow-hidden flex flex-col md:flex-row-reverse z-auto bg-white">
      <div className="h-[calc(100vh_-_4em)] w-full md:h-screen flex flex-col">
        <div className="flex p-2 justify-between shadow-md md:shadow-none md:h-[8%] md:border-b md:min-h-[3em] md:px-5">
          <div
            className="w-10 flex items-center md:hidden"
            onClick={() => {
              navigate("/");
              setCurrent(0);
              sessionStorage.setItem("current", "0");
            }}
          >
            <img src={Logo} />
          </div>
          <div className="hidden md:flex ">
            {navigations.map((data, index) => {
              return (
                <div key={index}>
                  {index === current && (
                    <div
                      className="flex items-center justify-center h-full space-x-3"
                      key={index}
                    >
                      <div>{data.icons}</div>
                      <h1 className="text-[1.5em] font-medium">{data.name}</h1>
                    </div>
                  )}
                </div>
              );
            })}
            {current == 5 && (
              <div>
                <div className="flex items-center justify-center h-full space-x-3">
                  <div>
                    <PagesOutlined className="text-[2em]" />
                  </div>
                  <h1 className="text-[1.5em] font-medium">Post</h1>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center relative">
            <div
              className="flex items-center justify-end border p-2 rounded-md md:w-[20em] xl:w-[25em] max-h-[3em]"
              onClick={() => setSearchElementShow(true)}
            >
              <input
                className="w-[95%] outline-none text-[0.85em] h-[1.5em] md:text-[1em] text-opacity-60 "
                placeholder="Search Twencon"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchString(e.target.value);
                }}
                value={searchString}
              />
              <Search className="md:text-[1.5em] cursor-pointer" />
            </div>
            <div
              className={`absolute top-full w-full h-[20em] bg-gray-100 border rounded-md z-50 overflow-auto p-2 ${
                searchElementShow ? "" : "hidden"
              }`}
              ref={searchElement}
            >
              {searchString == "" ? (
                <div className=" h-full w-full">
                  <h1 className="font-medium">Recent Searches</h1>
                  <div className="w-full h-[calc(100%_-_4em)] flex items-center justify-center">
                    No recent searches
                  </div>
                </div>
              ) : noUserFound ? (
                <div>
                  User{" "}
                  <span className="text-red-500 font-semibold">
                    {searchString}
                  </span>{" "}
                  is not found!
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {foundUsers?.map((user: any, index: any) => {
                    return (
                      <div
                        className="flex gap-2 items-center cursor-pointer bg-gray-200 rounded-md p-[0.2em] hover:bg-gray-300"
                        onClick={() => {
                          navigate(`/user/${user?.username}`);
                          setCurrent(4);
                          setSearchString("");
                          setSearchElementShow(false);
                          sessionStorage.setItem("current", "4");
                          sessionStorage.setItem("prevCurrent", "0");
                        }}
                        key={index}
                      >
                        <img
                          src={user?.profile == "icon" ? Person : user?.profile}
                          alt={user?.fullname}
                          className="w-12 rounded-full border-2"
                        />
                        <div className="text-[0.8em]">
                          <div>{user?.fullname}</div>
                          <div className="text-blue-500">@{user?.username}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`h-[92%] w-full ${current === 0 ? "block" : "hidden"}`}>
          <HomeComponent />
        </div>
        <div className={`h-[92%] ${current === 3 ? "block" : "hidden"}`}>
          <Messages />
        </div>
        <div className={`h-[92%] ${current === 4 ? "block" : "hidden"}`}>
          <UserAccount />
        </div>
        {current === 5 && (
          <div className={`h-[92%]`}>
            <Post />
          </div>
        )}
      </div>
      <div className="bg-white h-[7vh] min-h-[4em] w-full flex px-4 border-t md:w-[4%] md:h-screen md:px-0 md:flex-col md:border-t-0 md:border-r md:min-w-[5em] z-50">
        <div className="hidden md:flex md:h-[8%] items-center justify-center">
          <div
            className="w-10 flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
              setCurrent(0);
              sessionStorage.setItem("current", "0");
            }}
          >
            <img src={Logo} />
          </div>
        </div>
        <div className="h-full w-full flex-shrink flex items-center justify-between md:flex-col md:justify-center md:items-center md:h-[80%] md:space-y-10">
          {navigations.map((data, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  setCurrent(index);
                  sessionStorage.setItem("current", index.toString());
                  sessionStorage.setItem("prevCurrent", "0");
                  index == 4
                    ? navigate(`/user/${user?.username}`)
                    : navigate("/");
                }}
              >
                {data.icons}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
