import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAccount, useGetPosts } from "../../hooks";
import Person from "./../../assets/person/person.png";
import "./account.css";
const UserAccount: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const [posts, setPosts] = useState<any>([]);
  const [userAccount, setUserAccount] = useState<any>({});
  const locationArray = document.location.href.split("/");
  const getPosts = async () => {
    await useGetPosts(setPosts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    const username = locationArray[locationArray.length - 1];
    if (!username) return;
    if (username == user?.username) {
      setUserAccount(user);
    } else {
      getUserAccount(username, setUserAccount);
    }
  }, [document.location.href]);
  return (
    <div className="lg:w-[80%] xl:w-[50%] m-auto h-full my-2">
      <div className="border h-[20em] w-full bg-gray-200 rounded-md flex flex-col">
        <div className="border rounded-full h-1/2 relative">
          <img
            src={userAccount?.profile == "icon" ? Person : userAccount?.profile}
            className="rounded-full absolute h-[10em] w-[10em] -bottom-10 left-2"
          />
          {user?.username === userAccount?.username ? (
            <div className="rounded-full absolute right-3 bottom-3 border border-gray-500 p-2 px-4 cursor-pointer opacity-80 font-semibold">
              Edit your profile
            </div>
          ) : (
            <div className="rounded-full absolute right-3 bottom-3 p-2 px-4 cursor-pointer opacity-80 font-semibold bg-blue-500 text-white">
              Follow
            </div>
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
            <div className="flex gap-2">
              <span>0</span>
              <span className="font-bold">followers</span>
            </div>
            <div className="flex gap-2">
              <span>0</span>
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
        <ul className="image-gallery overflow-auto w-full gap-4 justify-center">
          {(posts as any)
            .filter((post: any) => {
              return post?.owner?.email === userAccount?.email;
            })
            .map((data: any, index: any) => {
              return (
                <li
                  className="border w-full md:w-auto min-w-[30em] items-center justify-center rounded-lg"
                  key={index}
                >
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
