import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDate, getPost } from "../../hooks";
import HomePageContext from "../../context/HomePageContext";
import Person from "./../../assets/person/person.png";

const Post: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const postId = useParams();
  const [post, setPost] = useState<any>({});
  const navigate = useNavigate();
  const { setCurrent } = useContext<any>(HomePageContext);
  useEffect(() => {
    if (document.location.href.includes("post")) getPost(postId, setPost);
  }, []);
  const buttons = ["Likes", "Comments"];
  const [currentShow, setCurrentShow] = useState<number>(0);
  console.log(post);
  return (
    <div className="hidden w-full h-full md:flex ">
      <div className="w-2/3 h-full border"></div>
      <div className="w-1/3 h-full border">
        <div className="w-full flex h-[2.5em]">
          {buttons.map((data, index) => {
            return (
              <div
                key={index}
                className={`w-1/2 ${
                  currentShow == index ? "border-b-4 border-blue-500" : ""
                }`}
                onClick={() => setCurrentShow(index)}
              >
                <Button className="w-full">{data}</Button>
              </div>
            );
          })}
        </div>
        <div
          className={`${
            currentShow == 0 ? "" : "hidden"
          } w-full h-[calc(100%_-_2.5em)]`}
        >
          <h1 className="text-blue-500 p-1 w-full h-[2em]">
            {post?.likes?.length == 0
              ? "No likes yet!"
              : post?.likes?.length == 1
              ? `${post?.likes?.length} person liked your post.`
              : `${post?.likes?.length} people liked your post.`}
          </h1>
          <div className="w-full h-[calc(100%_-_2em)] overflow-auto p-1 flex flex-col gap-2">
            {post?.likes
              ?.sort((a: any, b: any) => {
                let fa = a.date,
                  fb = b.date;
                if (fb > fa) return 1;
                if (fb < fa) return -1;
                return 0;
              })
              ?.map((data: any, index: any) => {
                return (
                  <div
                    className="flex gap-2 items-center bg-gray-200 p-1 rounded-md hover:bg-gray-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/${data.username}`);
                      setCurrent(4);
                      sessionStorage.setItem("current", "4");
                    }}
                    key={index}
                  >
                    <img
                      src={data.profile == "icon" ? Person : data.profile}
                      alt={data.fullname}
                      className="w-12 rounded-full border-2"
                    />
                    <div className="text-[0.8em]">
                      <div>
                        {data.fullname} {data?.email == user?.email && `(You)`}
                      </div>
                      <div className="text-blue-500">@{data.username}</div>
                    </div>
                    <div className="text-[0.8em] h-full p-1 text-blue-500">
                      {calculateDate(data?.date)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={`${
            currentShow == 1 ? "" : "hidden"
          } w-full h-[calc(100%_-_2.5em)]`}
        >
          <h1 className="text-blue-500 p-1 w-full h-[2em]">
            {post?.comments?.length == 0
              ? "No comments yet!"
              : post?.comments?.length == 1
              ? `${post?.comments?.length} comment on your post.`
              : `${post?.comments?.length} comments on your post.`}
          </h1>
          <div className="w-full h-[calc(100%_-_2em)] overflow-auto p-1 flex flex-col gap-2">
            {post?.comments
              ?.sort((a: any, b: any) => {
                let fa = a.date,
                  fb = b.date;

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              })
              .map((data: any, index: any) => {
                return (
                  <div className="flex flex-col gap-1" key={index}>
                    <div
                      className="flex gap-2 items-center bg-gray-200 p-1 rounded-md hover:bg-gray-300 cursor-pointer"
                      onClick={() => {
                        navigate(`/${data?.from?.username}`);
                        setCurrent(4);
                        sessionStorage.setItem("current", "4");
                      }}
                    >
                      <img
                        src={
                          data?.from?.profile == "icon"
                            ? Person
                            : data?.from?.profile
                        }
                        alt={data?.from?.fullname}
                        className="w-12 rounded-full border-2"
                      />
                      <div className="text-[0.8em]">
                        <div>
                          {data?.from?.fullname}{" "}
                          {data?.from?.email == user?.email && `(You)`}
                        </div>
                        <div className="text-blue-500">
                          @{data?.from?.username}
                        </div>
                      </div>
                      <div className="h-full p-1 text-[0.8em] text-blue-500">
                        {calculateDate(data?.date)}
                      </div>
                    </div>
                    <div className="p-2 ml-6 border-l-2 font-normal text-[0.9em]">
                      {data?.content}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
