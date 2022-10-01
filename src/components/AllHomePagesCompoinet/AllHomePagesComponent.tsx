import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatUrl, getAllUsers, useUserData } from "../../hooks";
import { userDataAction } from "../../features/user/userSlice";
import {
  Apps,
  FavoriteBorder,
  Notifications,
  PagesOutlined,
  Search
} from "@mui/icons-material";
import ChatIcon from "../../components/ChatIcon/ChatIcon";
import PhotoSkeleton from "../../components/Sketeleton/PhotoSkeleton/PhotoSkeleton";
import Logo from "./../../assets/logo/logo.png";
import Person from "./../../assets/person/person.png";
import HomePageContext from "../../context/HomePageContext";
export const AllHomePagesComponent: React.FC<{
  Component: any;
}> = ({ Component }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userData);
  const [current, setCurrent] = useState<number>(0);
  const [showPost, setShowPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
  const [messageNotifications, setMessageNotifications] = useState<number>(0);
  const [searchElementShow, setSearchElementShow] = useState<boolean>(false);
  const searchElement = useRef<any>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [foundUsers, setFoundUsers] = useState<any>([]);
  const [noUserFound, setNoUserFound] = useState<boolean>(false);
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
    getAllUsers(setUsers);
  }, []);
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
    href: string;
  }[] = [
    {
      icons: <Apps className="text-[2em]" />,
      name: "Home",
      href: ""
    },
    {
      name: "Favorite",
      icons: <FavoriteBorder className="text-[2em]" />,
      href: "favorite"
    },
    {
      icons: <Notifications className="text-[2em]" />,
      name: "Notifications",
      href: "notifications"
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
      name: "Messages",
      href: "messages"
    },
    {
      icons: (
        <>
          {user?.profile ? (
            <div className="border-2 rounded-full p-[0.1em]">
              <img
                src={
                  user?.profile == "icon" ? Person : formatUrl(user?.profile)
                }
                className="w-10 rounded-full"
              />
            </div>
          ) : (
            <PhotoSkeleton />
          )}
        </>
      ),
      name: "Account",
      href: "user"
    }
  ];
  useEffect(() => {
    const click = () => {
      if (!searchElement?.current?.contains(event?.target))
        setSearchElementShow(false);
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, [searchElement]);
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
    <>
      <HomePageContext.Provider
        value={{
          current,
          setCurrent,
          showPost,
          setShowPost,
          posts,
          setPosts,
          users,
          setUsers,
          isEditProfile,
          setIsEditProfile
        }}
      >
        <div className="h-screen relative overflow-hidden flex flex-col md:flex-row-reverse z-auto bg-white">
          <div className="h-[calc(100vh_-_4em)] w-full md:h-screen flex flex-col">
            <div className="flex p-2 justify-between shadow-md md:shadow-none md:h-[8%] md:border-b md:min-h-[3em] md:px-5">
              <div
                className="w-10 flex items-center md:hidden"
                onClick={() => {
                  navigate("/");
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
                          <h1 className="text-[1.5em] font-medium">
                            {data.name}
                          </h1>
                        </div>
                      )}
                    </div>
                  );
                })}
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
                              setSearchString("");
                              setSearchElementShow(false);
                            }}
                            key={index}
                          >
                            <img
                              src={
                                user?.profile == "icon"
                                  ? Person
                                  : formatUrl(user?.profile)
                              }
                              alt={user?.fullname}
                              className="w-12 rounded-full border-2"
                            />
                            <div className="text-[0.8em]">
                              <div>{user?.fullname}</div>
                              <div className="text-blue-500">
                                @{user?.username}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`h-[92%] w-full`}>{Component}</div>
          </div>
          <div className="bg-white h-[7vh] min-h-[4em] w-full flex px-4 border-t md:w-[4%] md:h-screen md:px-0 md:flex-col md:border-t-0 md:border-r md:min-w-[5em] z-50">
            <div className="hidden md:flex md:h-[8%] items-center justify-center">
              <div
                className="w-10 flex items-center cursor-pointer"
                onClick={() => {
                  navigate("/");
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
                      {
                        data.href == "user"
                          ? navigate(`/${data.href}/${user.username}`)
                          : navigate(`/${data.href}`);
                      }
                    }}
                  >
                    {data.icons}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </HomePageContext.Provider>
    </>
  );
};

export default AllHomePagesComponent;
