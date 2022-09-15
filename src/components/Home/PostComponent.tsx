import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  EmojiEmotions,
  Favorite,
  FavoriteBorder,
  Image
} from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDataAction } from "../../features/user/userSlice";
import { useGetPosts, useUserData } from "../../hooks";
import Picker from "emoji-picker-react";
import Loading from "./../../assets/loading/loading.gif";
import axios from "axios";
import Person from "./../../assets/person/person.png";
import { socket } from "../../context/chatContext";
import "./../../assets/style/post.css";
import AnimatedNumber from "react-animated-numbers";
const PostComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state?.user?.userData);
  const [postText, setPostText] = useState<string>("");
  const [showEmojiFile, setShowEmojiFile] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [allPostsObject, setAllPostsObject] = useState<any>();
  const emojiElement: any = useRef(null);
  const onEmojiClick = (event: any, emojiObject: any) => {
    let msg = postText;
    msg = msg + `${emojiObject.emoji}`;
    setPostText(msg);
  };
  const [images, setImages] = useState<any>([]);
  const [imageURLs, setImageURLs] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [newPosts, setNewPosts] = useState<any>([]);
  const [likeAnimation, setLikeAnimation] = useState<any>(false);
  const [textComment, setTextComment] = useState<any>({});
  const [loadingPostingComment, setLoadingPostingComment] =
    useState<boolean>(false);
  useEffect(() => {
    document.addEventListener("mousedown", () => {
      if (!emojiElement.current?.contains(event?.target))
        setShowEmojiFile(false);
    });
  }, [showEmojiFile]);
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
    useGetPosts(setPosts, setAllPostsObject);
  }, []);
  try {
    socket.off("like").on("like", (data) => {
      const newState = posts.map((post: any) => {
        if (post._id === data?.post?._id) {
          return { ...post, likes: data?.post?.likes };
        }
        return post;
      });
      setPosts(newState);
    });
    socket.off("post").on("post", (data) => {
      if (data?.owner._id == user?._id) {
        setPosts((current: any) => {
          return [data, ...current];
        });
      } else {
        setNewPosts((current: any) => {
          if (current.length < 1) return [data];
          return [data, ...current];
        });
      }
    });
    socket.off("comment").on("comment", (data) => {
      console.log(data);
      try {
        const newState = posts.map((post: any) => {
          if (post._id === data?.post?._id) {
            return { ...post, comments: data?.post?.comments };
          }
          return post;
        });
        setPosts(newState);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
  const calculateDate = (date: any) => {
    let diffTime = Math.abs(new Date().valueOf() - new Date(date).valueOf());
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    [days, hours, minutes, secs] = [
      Math.floor(days),
      Math.floor(hours),
      Math.floor(minutes),
      Math.floor(secs)
    ];
    if (days != 0) {
      if (days > 365) {
        let years = days / 365;
        return `${years.toFixed(0)}y`;
      } else {
        if (days > 30) {
          const months = days / 30;
          return `${months.toFixed(0)}mo`;
        }
        return `${days}d`;
      }
    } else if (hours != 0) {
      return `${hours}h`;
    } else if (minutes != 0) {
      return `${minutes}m`;
    } else {
      return `${secs}s`;
    }
  };

  const onImageChange = (e: any) => {
    setImages([...e.target.files]);
  };
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
  }, [images]);
  const post = async () => {
    try {
      setLoading(true);
      if (postText == "" && imageURLs.length < 1) return;
      const date = new Date();
      let post = {};
      if (imageURLs.length >= 1) {
        let urls: string[] = [];
        let index = 0;
        await images.map(async (image: any) => {});
        while (index < images.length) {
          let data = new FormData();
          let image = images[index];
          data.append("file", image);
          data.append("upload_preset", "chatpresetimages");
          let request = await axios.post(
            "https://api.cloudinary.com/v1_1/dkpaiyjv5/image/upload",
            data
          );
          let urlData = await request.data;
          urls.push(urlData.secure_url);
          index++;
        }
        post = {
          post: { description: postText, images: urls },
          owner: user,
          date
        };
      } else {
        post = {
          post: { description: postText, images: [] },
          owner: user,
          date
        };
      }
      socket.emit("create-post", post);
    } catch (error) {
      console.log(error);
    } finally {
      setPostText("");
      setLoading(false);
      setImageURLs([]);
      setImages([]);
    }
  };
  const like = async (id: any) => {
    try {
      socket.emit("like-post", user, id);
    } catch (error) {
      console.log(error);
    } finally {
      setLikeAnimation(id);
      setTimeout(() => {
        setLikeAnimation(false);
      }, 500);
    }
  };

  const comment = async (id: any, textComment: any) => {
    if (textComment == "") return;
    const date = new Date();
    try {
      socket.emit("create-comment", user, id, textComment, date);
    } catch (error) {
      console.log(error);
    } finally {
      setTextComment((current: any) => {
        return {
          ...current,
          [id]: ""
        };
      });
    }
  };
  const cancel = () => {
    setPostText("");
    setLoading(false);
    setImageURLs([]);
    setImages([]);
  };
  const viewNewPosts = () => {
    setPosts((current: any) => {
      return [...newPosts, ...current];
    });
    setNewPosts([]);
  };
  return (
    <div className="w-full md:w-3/5 flex items-center justify-center h-full min-h-full overflow-auto flex-col mb-1">
      <div className="h-full min-h-full w-full xl:w-4/5 2xl:w-3/5 p-2 md:px-4 flex flex-col gap-3 relative">
        {newPosts.length < 1 ? null : (
          <div
            className="py-1 flex items-center justify-center fixed left-[26%] sm:left-[28%] top-[4em] md:top-[5em] bg-white z-10 cursor-pointer"
            onClick={viewNewPosts}
          >
            <div className="bg-blue-500 p-1 px-3 rounded-md text-white">
              Click to check {newPosts.length} new{" "}
              {newPosts.length == 1 ? " post" : " posts"}
            </div>
          </div>
        )}
        <div
          className={`flex w-full gap-2 ${
            newPosts.length < 1 ? "" : "mt-[3em]"
          } `}
        >
          <div className="w-[2.5em] md:w-[4em] h-[2.5em] md:h-[4em] max-h-[4em] rounded-full border-2 flex justify-center items-center">
            {user?.profile === "icon" ? (
              <img src={Person} alt="" className="w-full h-full rounded-full" />
            ) : (
              <img
                src={user?.profile}
                alt=""
                className="w-full h-full rounded-full"
              />
            )}
          </div>
          <div className="w-[calc(100%_-_4em)]">
            <div className="w-full">
              <input
                type="text"
                value={postText}
                multiple={true}
                className="w-full border h-[2.5em] md:h-[3em] px-2 outline-none rounded-md"
                placeholder="Post Something!"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPostText(e.target.value);
                }}
              />
            </div>
            {imageURLs.length <= 0 ? null : (
              <div className="py-2 relative w-full">
                <div className="flex items-center justify-center">
                  <img src={imageURLs[currentImage]} />
                </div>
                <span
                  className="absolute top-[45%] cursor-pointer bg-white border rounded-full p-[0.1em]"
                  hidden={currentImage == 0 ? true : false}
                  onClick={() => {
                    if (currentImage == 0) {
                    } else {
                      setCurrentImage((current) => current - 1);
                    }
                    console.log(currentImage);
                  }}
                >
                  <ChevronLeft className="text-[1.6em]" />
                </span>
                <span
                  className="absolute top-[45%] right-0 cursor-pointer bg-white border rounded-full p-[0.1em]"
                  onClick={() => {
                    if (currentImage >= imageURLs.length - 1) {
                    } else {
                      setCurrentImage((current) => current + 1);
                    }
                    console.log(currentImage);
                  }}
                  hidden={currentImage >= imageURLs.length - 1}
                >
                  <ChevronRight className="text-[1.6em]" />
                </span>
              </div>
            )}
            <div className="flex mt-1 items-center justify-between">
              <div className="gap-2 flex">
                <div className="relative">
                  <span onClick={() => setShowEmojiFile((current) => !current)}>
                    <EmojiEmotions className="text-blue-500 text-[1.6em] cursor-pointer" />
                  </span>
                  {showEmojiFile && (
                    <div
                      className="absolute top-[2em] left-0 bg-white z-50"
                      ref={emojiElement}
                    >
                      <Picker
                        onEmojiClick={onEmojiClick}
                        pickerStyle={{ width: "100%" }}
                      />
                    </div>
                  )}
                </div>
                <span>
                  <label htmlFor="image-upload">
                    <Image className="text-blue-500 text-[1.6em] cursor-pointer" />
                    <input
                      type="file"
                      id="image-upload"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={onImageChange}
                    />
                  </label>
                </span>
              </div>
              <div className="flex gap-2">
                {imageURLs.length > 0 ||
                  (postText != "" && (
                    <Button
                      variant="contained"
                      className="bg-red-500 px-10 h-[2em] w-[3em] md:w-[5em] md:h-[2.5em]"
                      onClick={cancel}
                      disabled={loading}
                    >
                      {loading ? (
                        <img src={Loading} className="w-7" />
                      ) : (
                        "CANCEL"
                      )}
                    </Button>
                  ))}
                <Button
                  variant="contained"
                  className="bg-blue-500 px-10 h-[2em] w-[3em] md:w-[5em] md:h-[2.5em]"
                  onClick={post}
                  disabled={loading}
                >
                  {loading ? <img src={Loading} className="w-7" /> : "POST"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {(posts as any)?.map((data: any, index1: any) => {
          return (
            <div
              className="border w-full p-2 flex gap-2 rounded-md"
              key={index1}
            >
              <div className="w-[2.5em] md:w-[4em] h-[2.5em]  md:h-[4em] rounded-full border-2 flex items-center justify-center">
                {data?.owner?.profile === "icon" ? (
                  <img src={Person} alt="" className="rounded-full w-full" />
                ) : (
                  <img
                    src={data?.owner?.profile}
                    alt=""
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="w-[calc(100%_-_4em)] flex flex-col gap-2">
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <div className="font-medium text-[0.9em] md:text-[1em]">
                      {data?.owner?.fullname}
                    </div>
                    <div className="opacity-50">@{data?.owner?.username}</div>
                    <div className="text-blue-500">
                      {calculateDate(data?.date)}
                    </div>
                  </div>
                  <div className="font-normal py-1">
                    {data?.post?.description}
                  </div>
                </div>
                {(data?.post?.images as any)?.length <= 0 ? null : (
                  <div className="relative w-full flex overflow-hidden rounded-md">
                    {(data?.post?.images as any).map(
                      (image: any, index2: number) => {
                        return (
                          <div
                            className="flex items-center justify-center min-w-full rounded-md"
                            key={index2}
                          >
                            <img
                              src={
                                data?.post?.images[
                                  allPostsObject[index1]?.postCurrentImage
                                ]
                              }
                              className="rounded-md"
                            />
                          </div>
                        );
                      }
                    )}
                    <span
                      className="absolute top-[45%] cursor-pointer bg-white border rounded-full p-[0.1em]"
                      hidden={
                        allPostsObject[index1]?.postTotalImages <= 1 ||
                        allPostsObject[index1]?.postCurrentImage == 0
                      }
                      onClick={() => {
                        setAllPostsObject((current: any) => {
                          return {
                            ...current,
                            [index1]: {
                              ...allPostsObject[index1],
                              postCurrentImage:
                                allPostsObject[index1].postCurrentImage - 1
                            }
                          };
                        });
                      }}
                    >
                      <ChevronLeft className="text-[1.6em]" />
                    </span>
                    <span
                      className="absolute top-[45%] right-0 cursor-pointer bg-white border rounded-full p-[0.1em]"
                      hidden={
                        allPostsObject[index1]?.postTotalImages <= 1 ||
                        allPostsObject[index1]?.postCurrentImage ==
                          allPostsObject[index1]?.postTotalImages - 1
                      }
                      onClick={() => {
                        setAllPostsObject((current: any) => {
                          return {
                            ...current,
                            [index1]: {
                              ...allPostsObject[index1],
                              postCurrentImage:
                                allPostsObject[index1].postCurrentImage + 1
                            }
                          };
                        });
                      }}
                    >
                      <ChevronRight className="text-[1.6em]" />
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex justify-between items-center p-2 px-5">
                    <div
                      className={`flex justify-center items-center gap-2 ${
                        likeAnimation == data?._id && "likeBtn"
                      }`}
                    >
                      <span
                        onClick={() => like(data?._id)}
                        className="flex items-center justify-center"
                      >
                        {data?.likes.find((currentUser: any) => {
                          return currentUser._id == user?._id;
                        }) == undefined ? (
                          <FavoriteBorder className="md:text-[1.5em] opacity-70 cursor-pointer" />
                        ) : (
                          <Favorite className="md:text-[1.5em] cursor-pointer text-red-500" />
                        )}
                      </span>
                      <span className="text-[0.9em] flex items-center justify-center">
                        {(data?.likes as any)?.length <= 0
                          ? null
                          : data?.likes?.length}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <span className="flex items-center justify-center">
                        {(data?.comments as any)?.length <= 0 ? (
                          <i className="fa-regular fa-comment text-[1.3em] opacity-70 cursor-pointer"></i>
                        ) : (
                          <i className="fa-solid fa-comment text-[1.3em] opacity-70 cursor-pointer text-blue-500"></i>
                        )}
                      </span>
                      <span className="text-[0.9em] flex items-center justify-center">
                        {(data?.comments as any)?.length <= 0
                          ? null
                          : data?.comments.length}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <span className="flex items-center justify-center">
                        <i className="fa-regular fa-share-from-square text-[1.3em]  opacity-70 cursor-pointer"></i>
                      </span>
                      <span className="text-[0.9em] flex items-center justify-center">
                        {(data?.share as any)?.length <= 0 ? null : "10K"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 px-1 gap-1">
                    <span>
                      <EmojiEmotions />
                    </span>
                    <TextField
                      placeholder="Post a comment"
                      className="w-[85%]"
                      autoComplete="off"
                      size="small"
                      value={textComment[index1]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTextComment((current: any) => {
                          return {
                            ...current,
                            [index1]: e.target.value
                          };
                        });
                      }}
                    />
                    <Button
                      variant="contained"
                      className="bg-blue-500 text-[0.8em]"
                      onClick={() =>
                        comment(posts[index1]?._id, textComment[index1])
                      }
                    >
                      POST
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostComponent;
