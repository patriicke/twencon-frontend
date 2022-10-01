import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { follow, formatUrl } from "../../hooks";
import { socket } from "./../../context/chatContext";
import Person from "./../../assets/person/person.png";
import HomePageContext from "../../context/HomePageContext";
import Loading from "./../../assets/loading/loading.gif";
import SuggestionSkeleteon from "../Sketeleton/SuggestionSkeleton/SuggestionSkeleteon";
import PhotoSkeleton from "../Sketeleton/PhotoSkeleton/PhotoSkeleton";
const SuggestionComponent: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const { users, setUsers } = useContext<any>(HomePageContext);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFollowing, setCurrentFollowing] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      socket.off("follow").on("follow", (data) => {
        setUsers(data.users);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  });
  if (!users) {
    return <SuggestionSkeleteon />;
  }
  return (
    <div className="hidden w-2/5 border md:flex items-center justify-center h-full">
      <div className="h-full w-4/5 flex flex-col gap-2">
        <h1>Suggestions for you</h1>
        <div className="flex flex-col gap-2 ">
          {(users as any)
            ?.filter((currentUser: any) => {
              return currentUser?._id != user?._id;
            })
            ?.map((data: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-between p-1 rounded-lg bg-gray-100  hover:bg-gray-300 cursor-pointer"
                >
                  <div
                    className="flex gap-2 items-center justify-between "
                    onClick={() => {
                      navigate(`/user/${data?.username}`);
                    }}
                  >
                    {data?.profile ? (
                      <img
                        src={
                          data?.profile == "icon"
                            ? Person
                            : formatUrl(data?.profile)
                        }
                        alt={data?.fullname}
                        className="w-12 rounded-full border-2"
                      />
                    ) : (
                      <PhotoSkeleton />
                    )}
                    <div className="text-[0.8em]">
                      <div>{data?.fullname}</div>
                      <div className="text-blue-500">@{data?.username}</div>
                    </div>
                  </div>
                  {data?.followers?.find((currentUser: any) => {
                    return currentUser?.id == user?._id;
                  }) ? (
                    <button
                      className="bg-gray-200 text-blue-500 hover:bg-red-500 hover:text-white p-1 px-3 text-[0.8em] rounded-[2em] z-40"
                      onClick={() => {
                        setCurrentFollowing(index);
                        setLoading(true);
                        let date = new Date();
                        follow(
                          { id: user?._id, date },
                          { id: data?._id, date }
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
                      className="bg-blue-500 text-white p-1 px-3 text-[0.8em] rounded-[2em] z-40"
                      onClick={() => {
                        setCurrentFollowing(index);
                        setLoading(true);
                        let date = new Date();
                        follow(
                          { id: user?._id, date },
                          { id: data?._id, date }
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SuggestionComponent;
