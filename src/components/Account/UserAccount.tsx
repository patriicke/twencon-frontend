import { Favorite, FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePageContext from "../../context/HomePageContext";
import { deletePost, formatUrl, getUserAccount } from "../../hooks";
import Person from "./../../assets/person/person.png";
import Loading from "./../../assets/loading/loading.gif";
import { follow, poster } from "../../hooks";
import { socket } from "../../context/chatContext";
import "./account.css";
import UserAccountSkeleton from "../../components/Sketeleton/UserAccount/UserAccountSkeleton";
import { Button } from "@mui/material";
import EditProfile from "../../components/EditProfile/EditProfile";
const UserAccount: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const [userAccount, setUserAccount] = useState<any>({});
  const locationArray = document.location.href.split("/");
  const [loading, setLoading] = useState<boolean>(false);
  const { posts, setPosts, users, setUsers, isEditProfile, setIsEditProfile } =
    useContext<any>(HomePageContext);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [deletePostShow, setDeletePostShow] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<number>(0);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [deletePostLoading, setDeletePostLoading] = useState<boolean>(false);
  const [currentNavigation, setCurrentNavigation] = useState<number>(0);
  const navigate = useNavigate();
  const deletePostElement = useRef<any>(null);
  const [currentFollowing, setCurrentFollowing] = useState<boolean>(false);
  const [navigations, setNavigations] = useState<string[]>([
    "POSTS",
    "FOLLOWERS",
    "FOLLOWING"
  ]);
  useEffect(() => {
    const clickEvent = () => {
      if (!deletePostElement?.current?.contains(event?.target)) {
        setDeletePostShow(false);
      }
    };
    document.addEventListener("mousedown", clickEvent);
    return () => removeEventListener("mousedown", clickEvent);
  }, [deletePostElement]);
  useEffect(() => {
    let n = sessionStorage.getItem("currentNavigation");
    setCurrentNavigation(n ? Number(n) : 0);
  }, []);
  useEffect(() => {
    const username = locationArray[locationArray.length - 1];
    if (document.location.href.includes("post")) return;
    if (!username) {
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
      socket.off("follow").on("follow", async (data) => {
        const user = data?.users?.filter((user: any) => {
          return user._id == userAccount._id;
        });
        setUserAccount(user[0]);
        setUsers(data.users);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    if (sessionStorage.getItem("edit") == "true") {
      if (userAccount?._id == user?._id) setIsEditProfile(true);
    }
  });
  if (loadingData) {
    return (
      <div className="lg:w-[80%] xl:w-[50%] m-auto h-full my-2">
        <UserAccountSkeleton />
      </div>
    );
  }
  if (!loadingData && !userAccount?.profile) {
    return (
      <div className="lg:w-[80%] xl:w-[50%] m-auto h-full my-2">
        <div className="border h-[20em] w-full bg-gray-200 rounded-md flex flex-col">
          <div className="border rounded-full h-1/2 relative">
            <div className="rounded-full absolute h-[10em] w-[10em] -bottom-10 left-2 bg-gray-400 "></div>
          </div>
          <div className="h-1/2 bg-white p-2 pt-12">
            <h1 className="font-semibold text-red-500 text-[1.2em]">
              This user does not exist!
            </h1>
          </div>
        </div>
        <div className="overflow-auto h-[calc(100%_-_20em)] w-full mt-2 border p-2 rounded-md"></div>
      </div>
    );
  }
  document.title = `${userAccount?.fullname} (${userAccount?.username})`;
  return (
    <>
      {isEditProfile ? (
        <EditProfile userAccount={userAccount} />
      ) : (
        <>
          {showPopUp && (
            <div className="flex items-center justify-center">
              <div
                className={`absolute bg-white top-[45%] z-50 p-10 rounded-md border-2`}
              >
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">
                    Are you sure your want to delete this post
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <Button
                      className="w-1/3 bg-red-500 hover:bg-red-500"
                      variant="contained"
                      onClick={() => {
                        socket.emit("delete-post");
                        setDeletePostLoading(true);
                        deletePost(
                          posts?.filter((post: any) => {
                            return poster(post?.owner, users);
                          })[currentPost]?._id,
                          setDeletePostLoading,
                          setShowPopUp,
                          setPosts
                        );
                      }}
                      disabled={deletePostLoading}
                    >
                      {deletePostLoading ? (
                        <img src={Loading} className="w-6" />
                      ) : (
                        "Yes"
                      )}
                    </Button>
                    <Button
                      className="w-1/3 bg-blue-500"
                      variant="contained"
                      onClick={() => {
                        setShowPopUp(false);
                      }}
                      disabled={deletePostLoading}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`lg:w-[80%] xl:w-[50%] m-auto h-full my-2 relative ${
              showPopUp
                ? "blur-md opacity-75 pointer-events-none select-none"
                : ""
            }`}
          >
            <div className="border h-[20em] w-full bg-gray-200 rounded-md flex flex-col">
              <div className="border rounded-full h-1/2 relative">
                <div className="rounded-full absolute h-[10em] w-[10em] -bottom-10 left-2 hover:bg-gray-400 cursor-pointer p-[0.15em]">
                  <img
                    src={
                      userAccount?.profile == "icon"
                        ? Person
                        : userAccount?.profile
                    }
                    className="rounded-full hover:opacity-80 w-full"
                  />
                </div>
                {user?.username === userAccount?.username ? (
                  <div
                    className="rounded-full absolute right-3 bottom-3 border border-gray-500 p-2 px-4 cursor-pointer opacity-80 font-semibold"
                    onClick={() => {
                      setIsEditProfile(true);
                      sessionStorage.setItem("edit", "true");
                    }}
                  >
                    Edit your profile
                  </div>
                ) : userAccount?.followers?.find((data: any) => {
                    return data?.id == user?._id;
                  }) ? (
                  <button
                    className="rounded-full absolute right-3 bottom-3 p-2 px-4 cursor-pointer opacity-80 font-semibold bg-gray-500 text-white hover:bg-red-500"
                    onClick={() => {
                      let date = new Date();
                      follow(
                        { id: user?._id, date },
                        { id: userAccount?._id, date }
                      );
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
                      follow(
                        { id: user?._id, date },
                        { id: userAccount?._id, date }
                      );

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
                    <span className="font-bold">
                      {userAccount?.followers?.length == 1
                        ? "follower"
                        : "followers"}
                    </span>
                  </div>
                  <div className="flex gap-2 cursor-pointer">
                    <span>{userAccount?.following?.length}</span>
                    <span className="font-bold">following</span>
                  </div>
                  <div className="flex gap-2">
                    <span>
                      {
                        (posts as any)?.filter((post: any) => {
                          return post?.owner === userAccount?._id;
                        }).length
                      }
                    </span>
                    <span className="font-bold">posts</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-auto h-[calc(100%_-_20em)] w-full mt-2 border p-2 rounded-md">
              <div className="w-full pb-2 flex justify-center border-b mb-2 gap-2">
                {navigations.map((data: any, index: any) => {
                  return (
                    <div
                      className={`${
                        currentNavigation == index && "border-b-2"
                      } border-blue-500 `}
                      key={index}
                    >
                      <Button
                        onClick={() => {
                          setCurrentNavigation(index);
                          sessionStorage.setItem("currentNavigation", index);
                        }}
                      >
                        {data}
                      </Button>
                    </div>
                  );
                })}
              </div>
              <ul
                className={`image-gallery overflow-auto w-full ${
                  currentNavigation == 0 ? "" : "hidden"
                }`}
              >
                {(posts as any)
                  ?.filter((post: any) => {
                    return post?.owner === userAccount?._id;
                  })
                  ?.sort((a: any, b: any) => {
                    let fa = a.date,
                      fb = b.date;
                    if (fb > fa) return 1;
                    if (fb < fa) return -1;
                    return 0;
                  })
                  ?.map((data: any, index: any) => {
                    return (
                      <li
                        className="border w-full md:w-auto min-w-[20em] items-center justify-center rounded-lg relative"
                        key={index}
                      >
                        <div className="absolute top-1 right-1 cursor-pointer rounded-md z-40 w-10 flex flex-col items-center justify-center">
                          <div
                            onClick={() => {
                              setCurrentPost(index);
                              setDeletePostShow((current: any) => !current);
                            }}
                            onDoubleClick={() => {
                              setDeletePostShow(false);
                            }}
                          >
                            <MoreHoriz
                              className={`bg-gray-200  rounded-md w-10 duration-100`}
                            />
                          </div>
                          {deletePostShow && currentPost == index && (
                            <div
                              className={`bg-gray-200 w-[8em] min-h-[2.5em] absolute right-2 top-8 rounded-md flex items-center justify-center duration-200 flex-col gap-2 p-2`}
                              ref={deletePostElement}
                            >
                              {user?._id == data?.owner && (
                                <Button
                                  variant="contained"
                                  className="bg-red-500 h-[1.9em] text-[0.8em] w-[8em] hover:bg-red-500"
                                  onClick={() => {
                                    setShowPopUp(true);
                                    setDeletePostShow(false);
                                  }}
                                >
                                  DELETE
                                </Button>
                              )}
                              <Button
                                variant="contained"
                                className="bg-blue-500 h-[1.9em] text-[0.8em] w-[8em]"
                                onClick={() => {
                                  navigate(`/post/${posts[currentPost]?._id}`);
                                  setDeletePostShow(false);
                                }}
                              >
                                VIEW POST
                              </Button>
                            </div>
                          )}
                        </div>
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
                        <div
                          className="overlay flex flex-col"
                          onClick={() => {
                            navigate(`/post/${data?._id}`);
                          }}
                        >
                          <span className="text-center">
                            {data?.post?.description}
                          </span>
                          <div className="flex justify-between items-center p-2 px-5 gap-5">
                            <div
                              className={`flex justify-center items-center gap-2 `}
                            >
                              <span className="flex items-center justify-center">
                                {data?.likes.find((currentUser: any) => {
                                  return currentUser.id == user?._id;
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
                                {(data?.share as any)?.length <= 0
                                  ? null
                                  : "10K"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                {
                  <div
                    className={`${
                      (posts as any)
                        ?.filter((post: any) => {
                          return post?.owner === userAccount?._id;
                        })
                        ?.sort((a: any, b: any) => {
                          let fa = a.date,
                            fb = b.date;
                          if (fb > fa) return 1;
                          if (fb < fa) return -1;
                          return 0;
                        })?.length < 1
                        ? ""
                        : "hidden"
                    } font-semibold text-red-500`}
                  >
                    No posts yet!
                  </div>
                }
              </ul>
              <div
                className={`flex flex-col gap-2 ${
                  currentNavigation == 1 ? "" : "hidden"
                }  justify-center items-center`}
              >
                {(userAccount?.followers as any)?.map(
                  (data: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-2 items-center justify-between p-1 rounded-lg bg-gray-100  hover:bg-gray-300 cursor-pointer min-w-[25em] max-w-[30em]"
                      >
                        <div
                          className="flex gap-2 items-center justify-between "
                          onClick={() => {
                            navigate(
                              `/user/${poster(data?.id, users)?.username}`
                            );
                          }}
                        >
                          <img
                            src={
                              poster(data?.id, users)?.profile == "icon"
                                ? Person
                                : formatUrl(poster(data?.id, users)?.profile)
                            }
                            alt={poster(data?.id, users)?.fullname}
                            className="w-12 rounded-full border-2"
                          />
                          <div className="text-[0.8em]">
                            <div>{poster(data?.id, users)?.fullname}</div>
                            <div className="text-blue-500">
                              @{poster(data?.id, users)?.username}
                            </div>
                          </div>
                        </div>
                        {poster(data?.id, users)?.email !== user?.email ? (
                          <>
                            {users
                              ?.filter((user: any) => {
                                return user?._id == data?.id;
                              })[0]
                              ?.followers?.find((currentUser: any) => {
                                return currentUser?.id == user?._id;
                              }) ? (
                              <button
                                className="bg-gray-200 text-blue-500 hover:bg-red-500 hover:text-white p-1 px-3 text-[0.8em] rounded-[2em] z-50"
                                onClick={() => {
                                  setCurrentFollowing(index);
                                  setLoading(true);
                                  let date = new Date();
                                  follow(
                                    { id: user?._id, date },
                                    { id: data?.id, date }
                                  );
                                }}
                                onMouseEnter={() => {
                                  setShowContent(true);
                                  setCurrentFollowing(index);
                                }}
                                onMouseLeave={() => {
                                  setShowContent(false);
                                  setCurrentFollowing(index);
                                }}
                                disabled={loading && currentFollowing == index}
                              >
                                {loading && currentFollowing == index ? (
                                  <img src={Loading} alt="" className="w-5" />
                                ) : showContent && currentFollowing == index ? (
                                  "Unfollow"
                                ) : (
                                  "Following"
                                )}
                              </button>
                            ) : (
                              <button
                                className="bg-blue-500 text-white p-1 px-3 text-[0.8em] rounded-[2em] z-50"
                                onClick={() => {
                                  setCurrentFollowing(index);
                                  setLoading(true);
                                  let date = new Date();
                                  follow(
                                    { id: user?._id, date },
                                    { id: data?.id, date }
                                  );
                                }}
                                disabled={loading && currentFollowing == index}
                              >
                                {loading && currentFollowing == index ? (
                                  <img src={Loading} alt="" className="w-5" />
                                ) : (
                                  "Follow"
                                )}
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="bg-gray-200 text-blue-500 p-1 px-3 text-[0.8em] rounded-[2em] z-50">
                            You
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
                {userAccount?.followers.length < 1 && (
                  <div className="font-semibold text-red-500">
                    No follower yet!
                  </div>
                )}
              </div>
              <div
                className={`flex flex-col gap-2 ${
                  currentNavigation == 2 ? "" : "hidden"
                }  justify-center items-center `}
              >
                {(userAccount?.following as any)?.map(
                  (data: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-2 items-center justify-between p-1 rounded-lg bg-gray-100  hover:bg-gray-300 cursor-pointer min-w-[25em] max-w-[30em]"
                      >
                        <div
                          className="flex gap-2 items-center justify-between "
                          onClick={() => {
                            navigate(
                              `/user/${poster(data?.id, users)?.username}`
                            );
                          }}
                        >
                          <img
                            src={
                              poster(data?.id, users)?.profile == "icon"
                                ? Person
                                : formatUrl(poster(data?.id, users)?.profile)
                            }
                            alt={poster(data?.id, users)?.fullname}
                            className="w-12 rounded-full border-2"
                          />
                          <div className="text-[0.8em]">
                            <div>{poster(data?.id, users)?.fullname}</div>
                            <div className="text-blue-500">
                              @{poster(data?.id, users)?.username}
                            </div>
                          </div>
                        </div>
                        {poster(data?.id, users)?.email !== user?.email ? (
                          <>
                            {users
                              ?.filter((user: any) => {
                                return user?._id == poster(data, users)?._id;
                              })[0]
                              ?.following?.find((currentUser: any) => {
                                return currentUser?.id == user?._id;
                              }) ? (
                              <button
                                className="bg-gray-200 text-blue-500 hover:bg-red-500 hover:text-white p-1 px-3 text-[0.8em] rounded-[2em] z-50"
                                onClick={() => {
                                  setCurrentFollowing(index);
                                  setLoading(true);
                                  let date = new Date();
                                  follow(
                                    { id: user?._id, date },
                                    { id: data?.id, date }
                                  );
                                }}
                                onMouseEnter={() => {
                                  setShowContent(true);
                                  setCurrentFollowing(index);
                                }}
                                onMouseLeave={() => {
                                  setShowContent(false);
                                  setCurrentFollowing(index);
                                }}
                                disabled={loading && currentFollowing == index}
                              >
                                {loading && currentFollowing == index ? (
                                  <img src={Loading} alt="" className="w-5" />
                                ) : showContent && currentFollowing == index ? (
                                  "Unfollow"
                                ) : (
                                  "Following"
                                )}
                              </button>
                            ) : (
                              <button
                                className="bg-blue-500 text-white p-1 px-3 text-[0.8em] rounded-[2em] z-50"
                                onClick={() => {
                                  setCurrentFollowing(index);
                                  setLoading(true);
                                  let date = new Date();
                                  follow(
                                    { id: user?._id, date },
                                    { id: data?.id, date }
                                  );
                                }}
                                disabled={loading && currentFollowing == index}
                              >
                                {loading && currentFollowing == index ? (
                                  <img src={Loading} alt="" className="w-5" />
                                ) : (
                                  "Follow"
                                )}
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="bg-gray-200 text-blue-500 p-1 px-3 text-[0.8em] rounded-[2em] z-50">
                            You
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
                {userAccount?.following.length < 1 && (
                  <div className="font-semibold text-red-500">
                    No followings!
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserAccount;
