import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePageContext from "../../context/HomePageContext";
import { getUserAccount, useGetPosts } from "../../hooks";
import Person from "./../../assets/person/person.png";
import Loading from "./../../assets/loading/loading.gif";
import { follow } from "../../hooks";
import { socket } from "../../context/chatContext";
import "./account.css";
import UserAccountSkeleton from "../../components/Sketeleton/UserAccount/UserAccountSkeleton";
const UserAccount: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const [posts, setPosts] = useState<any>([]);
  const [userAccount, setUserAccount] = useState<any>({});
  const locationArray = document.location.href.split("/");
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrent } = useContext<any>(HomePageContext);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const navigate = useNavigate();
  const getPosts = async () => {
    await useGetPosts(setPosts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    const username = locationArray[locationArray.length - 1];
    if (!username) {
      setCurrent(0);
      sessionStorage.setItem("current", "0");
      navigate(`/`);
      setLoadingData(true);
      return;
    }
    if (username == user?.username) {
      setUserAccount(user);
      setLoadingData(false);
    } else {
      getUserAccount(username, setUserAccount, setLoadingData);
    }
  }, [document.location.href]);
  useEffect(() => {
    try {
      socket.off("follow").on("follow", (data) => {
        const user = data?.users?.filter((user: any) => {
          return user._id == userAccount._id;
        });
        setUserAccount(user[0]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });
  if (loadingData) {
    return (
      <div className="lg:w-[80%] xl:w-[50%] m-auto h-full my-2">
        <UserAccountSkeleton />
      </div>
    );
  }
  return (
    <div className="lg:w-[80%] xl:w-[50%] m-auto h-full my-2">
      <div className="border h-[20em] w-full bg-gray-200 rounded-md flex flex-col">
        <div className="border rounded-full h-1/2 relative">
          <div className="rounded-full absolute h-[10em] w-[10em] -bottom-10 left-2 hover:bg-gray-400 cursor-pointer p-[0.15em] ">
            <img
              src={
                userAccount?.profile == "icon" ? Person : userAccount?.profile
              }
              className="rounded-full hover:opacity-80"
            />
          </div>
          {user?.username === userAccount?.username ? (
            <div className="rounded-full absolute right-3 bottom-3 border border-gray-500 p-2 px-4 cursor-pointer opacity-80 font-semibold">
              Edit your profile
            </div>
          ) : userAccount?.followers?.find((currentUser: any) => {
              return currentUser?._id == user?._id;
            }) ? (
            <button
              className="rounded-full absolute right-3 bottom-3 p-2 px-4 cursor-pointer opacity-80 font-semibold bg-gray-500 text-white hover:bg-red-500"
              onClick={() => {
                let date = new Date();
                follow({ ...user, date }, { ...userAccount, date });
                setLoading(true);
              }}
              onMouseEnter={() => {
                setShowContent(true);
              }}
              onMouseLeave={() => {
                setShowContent(false);
              }}
            >
              {loading ? (
                <img src={Loading} className="w-5" />
              ) : showContent ? (
                "Unfollow"
              ) : (
                "Following"
              )}
            </button>
          ) : (
            <button
              className="rounded-full absolute right-3 bottom-3 p-2 px-4 cursor-pointer opacity-80 font-semibold bg-blue-500 text-white"
              onClick={() => {
                let date = new Date();
                follow({ ...user, date }, { ...userAccount, date });
                setLoading(true);
              }}
            >
              {loading ? <img src={Loading} className="w-5" /> : "Follow"}
            </button>
          )}
        </div>
        <div className="h-1/2 bg-white p-2 pt-12">
          <div className="flex gap-2">
            <h1 className="font-semibold opacity-80 text-[1.3em]">
              {userAccount?.fullname}
            </h1>
            <h1 className="font-normal opacity-80 text-[1.3em] text-blue-600">
              @{userAccount?.username}
            </h1>
          </div>
          <div className="flex py-2 gap-3 text-[1.2em]">
            <div className="flex gap-2 cursor-pointer">
              <span>{userAccount?.followers?.length}</span>
              <span className="font-bold">followers</span>
            </div>
            <div className="flex gap-2 cursor-pointer">
              <span>{userAccount?.following?.length}</span>
              <span className="font-bold">following</span>
            </div>
            <div className="flex gap-2">
              <span>
                {
                  (posts as any).filter((post: any) => {
                    return post?.owner?.email === userAccount?.email;
                  }).length
                }
              </span>
              <span className="font-bold">posts</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto h-[calc(100%_-_20em)] w-full mt-2 border p-2 rounded-md">
        <ul className="image-gallery overflow-auto w-full">
          {(posts as any)
            .filter((post: any) => {
              return post?.owner?.email === userAccount?.email;
            })
            .map((data: any, index: any) => {
              return (
                <li
                  className="border w-full md:w-auto min-w-[20em] items-center justify-center rounded-lg"
                  key={index}
                >
                  <LazyLoadComponent>
                    {data?.post?.images[0]?.includes("video") ? (
                      <video
                        className="flex items-center justify-center max-w-[30em]"
                        controls
                      >
                        <source src={data?.post?.images[0]} />
                      </video>
                    ) : data?.post?.images[0] == null ? (
                      <div className="flex items-center justify-center h-full italic text-center">
                        {data?.post?.description}
                      </div>
                    ) : (
                      <img src={data?.post?.images[0]} />
                    )}
                  </LazyLoadComponent>
                  <div className="overlay flex flex-col">
                    <span className="text-center">
                      {data?.post?.description}
                    </span>
                    <div className="flex justify-between items-center p-2 px-5 gap-5">
                      <div
                        className={`flex justify-center items-center gap-2 `}
                      >
                        <span className="flex items-center justify-center">
                          {data?.likes.find((currentUser: any) => {
                            return currentUser._id == user?._id;
                          }) == undefined ? (
                            <FavoriteBorder className="md:text-[2em] opacity-70 cursor-pointer" />
                          ) : (
                            <Favorite className="md:text-[2em] cursor-pointer text-red-500" />
                          )}
                        </span>
                        <span className="text-[1.2em] flex items-center justify-center">
                          {(data?.likes as any)?.length <= 0
                            ? null
                            : data?.likes?.length}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <span className="flex items-center justify-center">
                          {(data?.comments as any)?.length <= 0 ? (
                            <i className="fa-regular fa-comment text-[1.6em] opacity-70 cursor-pointer"></i>
                          ) : (
                            <i className="fa-solid fa-comment text-[1.6em] opacity-70 cursor-pointer text-blue-500"></i>
                          )}
                        </span>
                        <span className="text-[1.2em] flex items-center justify-center">
                          {(data?.comments as any)?.length <= 0
                            ? null
                            : data?.comments.length}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <span className="flex items-center justify-center">
                          <i className="fa-regular fa-share-from-square text-[1.4em]  opacity-70 cursor-pointer"></i>
                        </span>
                        <span className="text-[1.2em] flex items-center justify-center">
                          {(data?.share as any)?.length <= 0 ? null : "10K"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default UserAccount;
