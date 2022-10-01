import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDate, getPost } from "../../hooks";
import HomePageContext from "../../context/HomePageContext";
import Person from "./../../assets/person/person.png";
import UserPostSkeleton from "../Sketeleton/UserPostSkeleton/UserPostSkeleton";
import Loading from "./../../assets/loading/loading.gif";
import ReactPlayer from "react-player";
import {
  ChevronLeft,
  ChevronRight,
  EmojiEmotions,
  Favorite,
  FavoriteBorder
} from "@mui/icons-material";
import Picker from "emoji-picker-react";
import { socket } from "../../context/chatContext";
import AudioClick from "./../../assets/audio/click.mp3";
import { poster } from "../../hooks";
import PhotoSkeleton from "../Sketeleton/PhotoSkeleton/PhotoSkeleton";
const PostComponent: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const postId = useParams();
  const [post, setPost] = useState<any>({});
  const navigate = useNavigate();
  const commentEmojiElement = useRef<any>(null);
  const { posts, setPosts, users } = useContext<any>(HomePageContext);
  const [postLoading, setPostLoading] = useState<any>(true);
  const [textComment, setTextComment] = useState<string>("");
  const [loadingPostingComment, setLoadingPostingComment] =
    useState<boolean>(false);
  const [likeAnimation, setLikeAnimation] = useState<boolean>(false);
  const buttons = ["Likes", "Comments"];
  const [currentShow, setCurrentShow] = useState<number>(0);
  const [showCommentEmojiElement, setShowCommentEmojiElement] =
    useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  useEffect(() => {
    if (document.location.href.includes("post"))
      getPost(postId, setPost, setPostLoading);
  }, []);
  useEffect(() => {
    if (posts)
      posts?.map((currentPost: any) => {
        if (currentPost?._id == post?._id) setPost(post);
      });
  }, [posts]);
  useEffect(() => {
    document.addEventListener("mousedown", () => {
      if (!commentEmojiElement.current?.contains(event?.target))
        setShowCommentEmojiElement(false);
    });
  }, [showCommentEmojiElement]);
  const onEmojiClickPostComment = (event?: any, emojiObject?: any) => {
    let msg = "";
    if (textComment) {
      msg = textComment;
    }
    msg = msg + `${emojiObject.emoji}`;
    setTextComment(msg);
  };
  const comment = async () => {
    setLoadingPostingComment(true);
    try {
      if (textComment == "" || textComment == null)
        return setLoadingPostingComment(false);
      const date = new Date();
      socket.emit("create-comment", user?._id, post._id, textComment, date);
    } catch (error) {
      console.log(error);
    } finally {
      setTextComment("");
    }
  };
  const like = async () => {
    try {
      const clickSound = new Audio(AudioClick);
      clickSound.play();
      let likeExist = post?.likes?.find((curentUser: any) => {
        return curentUser.id == user._id;
      });
      if (likeExist) {
        const newState = posts.map((cpost: any) => {
          if (cpost._id === post._id) {
            return {
              ...cpost,
              likes: cpost?.likes.filter((cuser: any) => {
                return cuser.id != user?._id;
              })
            };
          }
          return cpost;
        });
        setPosts(newState);
        setPost((post: any) => {
          return {
            ...post,
            likes: post?.likes.filter((cuser: any) => {
              return cuser.id != user?._id;
            })
          };
        });
      } else {
        const newState = posts.map((cpost: any) => {
          if (cpost._id === post._id) {
            return {
              ...cpost,
              likes: [...cpost.likes, { id: user._id, date: new Date() }]
            };
          }
          return cpost;
        });
        setPosts(newState);
        setPost((post: any) => {
          return {
            ...post,
            likes: [...post.likes, { id: user._id, date: new Date() }]
          };
        });
      }
      socket.emit("like-post", { id: user?._id, date: new Date() }, post?._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLikeAnimation(true);
      setTimeout(() => {
        setLikeAnimation(false);
      }, 500);
    }
  };
  if (postLoading) {
    return <UserPostSkeleton />;
  }
  if (!postLoading && !post) {
    return (
      <div className="flex w-full h-full">
        <div className="border w-2/3 h-full">
          <h1 className="text-red-500 p-1 font-bold">
            This post has been deleted!
          </h1>
        </div>
        <div className="border w-1/3 h-full"></div>
      </div>
    );
  }
  try {
    socket.off("like").on("like", (data) => {
      if (data.liker != user._id) {
        setPost((currentData: any) => {
          return { ...currentData, likes: data?.post?.likes };
        });
        const newState = posts?.map((post: any) => {
          if (post._id === data?.post?._id) {
            return { ...post, likes: data?.post?.likes };
          }
          return post;
        });
        setPosts(newState);
      }
    });
    socket.off("comment").on("comment", (data) => {
      setPost((currentData: any) => {
        return { ...currentData, comments: data?.post?.comments };
      });
      const newState = posts.map((post: any) => {
        if (post._id === data?.post?._id) {
          return { ...post, comments: data?.post?.comments };
        }
        return post;
      });
      setPosts(newState);
      setLoadingPostingComment(false);
    });
  } catch (error) {
    console.log(error);
  } finally {
  }

  return (
    <div className="w-full h-full md:flex delay-100">
      <div className="w-full md:w-2/3 h-full border flex justify-center p-1">
        <div className="flex gap-2 w-full md:w-3/5">
          <div className="p-2 w-full ">
            <div className="border  p-2 flex  gap-2 rounded-md select-none relative">
              <div
                className="w-[2.5em] md:w-[4em] h-[2.5em]  md:h-[4em] rounded-full border-2 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  navigate(`/user/${poster(post?.owner, users)?.username}`);
                }}
              >
                {poster(post?.owner, users)?.profile ? (
                  <img
                    src={
                      poster(post?.owner, users)?.profile === "icon"
                        ? Person
                        : poster(post?.owner, users)?.profile
                    }
                    alt=""
                    className="rounded-full w-full"
                  />
                ) : (
                  <PhotoSkeleton />
                )}
              </div>
              <div className="w-[calc(100%_-_4em)] flex flex-col gap-2">
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <div
                      className="font-medium text-[0.9em] md:text-[1em] cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/user/${poster(post?.owner, users)?.username}`
                        );
                      }}
                    >
                      {poster(post?.owner, users)?.fullname}
                    </div>
                    <div
                      className="opacity-50 cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/user/${poster(post?.owner, users)?.username}`
                        );
                      }}
                    >
                      @{poster(post?.owner, users)?.username}
                    </div>
                    <div className="text-blue-500">
                      {calculateDate(post?.date)}
                    </div>
                  </div>
                  <div className="font-normal py-1">
                    {post?.post?.description}
                  </div>
                </div>
                {(post?.post?.images as any)?.length <= 0 ? null : (
                  <div className="relative w-full flex overflow-hidden rounded-md postHeight">
                    {(post?.post?.images as any)?.map(
                      (image: any, index2: number) => {
                        return (
                          <div
                            className="flex items-center justify-center min-w-full rounded-md"
                            key={index2}
                          >
                            <div className="flex items-center justify-center min-h-[15em] videos">
                              {image?.includes("video") ? (
                                <ReactPlayer
                                  url={post?.post?.images[currentImage]}
                                  controls
                                  muted={true}
                                  loop
                                  playing={true}
                                />
                              ) : (
                                <img
                                  src={post?.post?.images[currentImage]}
                                  className="rounded-md"
                                />
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                    <span
                      className="absolute top-[45%] cursor-pointer bg-white border rounded-full p-[0.1em]"
                      hidden={currentImage == 0 ? true : false}
                      onClick={() => {
                        if (currentImage == 0) {
                        } else {
                          setCurrentImage((current: any) => current - 1);
                        }
                      }}
                    >
                      <ChevronLeft className="text-[1.6em]" />
                    </span>
                    <span
                      className="absolute top-[45%] right-0 cursor-pointer bg-white border rounded-full p-[0.1em]"
                      hidden={currentImage >= post?.post?.images?.length - 1}
                      onClick={() => {
                        if (currentImage >= post?.post?.images?.length - 1) {
                        } else {
                          setCurrentImage((current: any) => current + 1);
                        }
                      }}
                    >
                      <ChevronRight className="text-[1.6em]" />
                    </span>
                  </div>
                )}
                {post?.post?.images?.length > 1 && (
                  <div className="w-auto px-2 m-auto rounded-md h-[1.5em] bg-gray-200 flex justify-center items-center gap-2">
                    {(post?.post?.images as any)?.map(
                      (data: any, index: any) => {
                        return (
                          <div
                            className="p-[0.15em] bg-white rounded-full"
                            key={index}
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                currentImage == index ? "bg-red-500" : ""
                              }`}
                            ></div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                <div>
                  <div className="flex justify-between items-center p-2 px-5">
                    <div
                      className={`flex justify-center items-center gap-2 ${
                        likeAnimation && "likeBtn"
                      }`}
                    >
                      <span
                        onClick={like}
                        className="flex items-center justify-center"
                      >
                        {post?.likes?.find((currentId: any) => {
                          return currentId.id == user?._id;
                        }) == undefined ? (
                          <FavoriteBorder className="md:text-[1.5em] opacity-70 cursor-pointer" />
                        ) : (
                          <Favorite className="md:text-[1.5em] cursor-pointer text-red-500" />
                        )}
                      </span>
                      <span className="text-[0.9em] flex items-center justify-center">
                        {(post?.likes as any)?.length <= 0
                          ? null
                          : post?.likes?.length}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <span className="flex items-center justify-center">
                        {(post?.comments as any)?.length <= 0 ? (
                          <i className="fa-regular fa-comment text-[1.3em] opacity-70 cursor-pointer"></i>
                        ) : (
                          <i className="fa-solid fa-comment text-[1.3em] opacity-70 cursor-pointer text-blue-500"></i>
                        )}
                      </span>
                      <span className="text-[0.9em] flex items-center justify-center">
                        {(post?.comments as any)?.length <= 0
                          ? null
                          : post?.comments?.length}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <span className="flex items-center justify-center">
                        <i className="fa-regular fa-share-from-square text-[1.3em]  opacity-70 cursor-pointer"></i>
                      </span>
                      <span className="text-[0.9em] flex items-center justify-center">
                        {(post?.share as any)?.length <= 0 ? null : "10K"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 px-1 gap-1">
                    <div className="relative">
                      <span
                        onClick={() => {
                          setShowCommentEmojiElement(true);
                        }}
                        className="cursor-pointer"
                      >
                        <EmojiEmotions />
                      </span>
                      {showCommentEmojiElement && (
                        <div
                          className="absolute bottom-[2.5em] left-0 bg-white z-50"
                          ref={commentEmojiElement}
                        >
                          <Picker
                            onEmojiClick={onEmojiClickPostComment}
                            pickerStyle={{ width: "100%" }}
                          />
                        </div>
                      )}
                    </div>
                    <TextField
                      placeholder="Post a comment"
                      className="w-[85%]"
                      autoComplete="off"
                      size="small"
                      value={textComment}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTextComment(e.target.value);
                      }}
                    />
                    <Button
                      variant="contained"
                      disabled={loadingPostingComment}
                      className="bg-blue-500 text-[0.8em] flex items-center justify-center"
                      onClick={comment}
                    >
                      {loadingPostingComment ? (
                        <img src={Loading} alt="" className="w-6" />
                      ) : (
                        "POST"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/3 h-full border">
        <div className="w-full flex h-[2.5em]">
          {buttons.map((post, index) => {
            return (
              <div
                key={index}
                className={`w-1/2 ${
                  currentShow == index ? "border-b-4 border-blue-500" : ""
                }`}
                onClick={() => setCurrentShow(index)}
              >
                <Button className="w-full">{post}</Button>
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
              ? `${post?.likes?.length} person liked ${
                  user?._id == post?.owner ? "your" : "this"
                } post.`
              : `${post?.likes?.length} people liked ${
                  user?._id == post?.owner ? "your" : "this"
                } post.`}
          </h1>
          <div className="w-full h-[calc(100%_-_2em)] overflow-auto p-1 flex flex-col gap-2">
            {post?.likes
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
              ?.map((post: any, index: any) => {
                return (
                  <div
                    className="flex gap-2 items-center bg-gray-200 p-1 rounded-md hover:bg-gray-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/user/${poster(post?.id, users).username}`);
                    }}
                    key={index}
                  >
                    <img
                      src={
                        poster(post?.id, users)?.profile == "icon"
                          ? Person
                          : poster(post?.id, users)?.profile
                      }
                      alt={poster(post?.id, users)?.fullname}
                      className="w-12 rounded-full border-2"
                    />
                    <div className="text-[0.8em]">
                      <div>
                        {poster(post?.id, users)?.fullname}{" "}
                        {post?.email == user?.email && `(You)`}
                      </div>
                      <div className="text-blue-500">
                        @{poster(post?.id, users)?.username}
                      </div>
                    </div>
                    <div className="text-[0.8em] h-full p-1 text-blue-500">
                      {calculateDate(post?.date)}
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
              ? `${post?.comments?.length} comment on ${
                  user?._id == post?.owner ? "your" : "this"
                } post.`
              : `${post?.comments?.length} comments on ${
                  user?._id == post?.owner ? "your" : "this"
                } post.`}
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
              ?.map((post: any, index: any) => {
                return (
                  <div className="flex flex-col gap-1" key={index}>
                    <div
                      className="flex gap-2 items-center bg-gray-200 p-1 rounded-md hover:bg-gray-300 cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/user/${poster(post?.from, users)?.username}`
                        );
                      }}
                    >
                      {poster(post?.from, users)?.profile ? (
                        <img
                          src={
                            poster(post?.from, users)?.profile == "icon"
                              ? Person
                              : poster(post?.from, users)?.profile
                          }
                          alt={poster(post?.from, users)?.fullname}
                          className="w-12 rounded-full border-2"
                        />
                      ) : (
                        <PhotoSkeleton />
                      )}
                      <div className="text-[0.8em]">
                        <div>
                          {poster(post?.from, users)?.fullname}{" "}
                          {poster(post?.from, users)?.email == user?.email &&
                            `(You)`}
                        </div>
                        <div className="text-blue-500">
                          @{poster(post?.from, users)?.username}
                        </div>
                      </div>
                      <div className="h-full p-1 text-[0.8em] text-blue-500">
                        {calculateDate(post?.date)}
                      </div>
                    </div>
                    <div className="p-2 ml-6 border-l-2 font-normal text-[0.9em]">
                      {post?.content}
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

export default PostComponent;
