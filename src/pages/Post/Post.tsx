import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../hooks";

const Post: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const postId = useParams();
  const [post, setPost] = useState<any>({});
  useEffect(() => {
    if (document.location.href.includes("post")) getPost(postId, setPost);
  }, []);
  const buttons = ["Likes", "Comments"];
  const [currentShow, setCurrentShow] = useState<number>(0);
  return (
    <div className="w-full h-full flex">
      <div className="w-2/3 h-full border"></div>
      <div className="w-1/3 h-full border">
        <div className="w-full flex">
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
          } w-full overflow-auto h-full`}
        >
          Likes
        </div>
        <div
          className={`${
            currentShow == 1 ? "" : "hidden"
          } w-full overflow-auto h-full`}
        >
          comments
        </div>
      </div>
    </div>
  );
};

export default Post;
