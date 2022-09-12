import { EmojiEmotions, FavoriteBorder } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDataAction } from "../../features/user/userSlice";
import { useUserData } from "../../hooks";

const PostComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useUserData(navigate, dispatch, userDataAction);
  const user = useSelector((state: any) => state?.user?.userData);
  return (
    <div className="w-2/4 border flex items-center justify-center h-full overflow-auto">
      <div className="h-full w-4/5 p-2 px-4 flex flex-col gap-3">
        <div className="border w-full p-2 flex gap-2">
          <div className="w-[4em] h-[4em] rounded-full border-2">
            <img src={user?.profile} alt="" className="rounded-full" />
          </div>
          <div className="w-[calc(100%_-_4em)] flex flex-col gap-2">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <div className="font-medium">{user?.fullname}</div>
                <div className="opacity-50">@{user?.username}</div>
                <div className="text-blue-500 opacity-80">14h</div>
              </div>
              <div className="font-normal py-1">
                when applications open tomorrow, apply!! The mentors & space to
                learn and grow are incomparable.
              </div>
            </div>
            <div>
              <img
                src="https://pbs.twimg.com/media/FcYuK2ZXwAIOqTB?format=jpg&name=small"
                alt=""
                className="rounded-md"
              />
            </div>
            <div>
              <div className="flex justify-between items-center p-2 px-5">
                <div className="flex justify-center items-center gap-2">
                  <span>
                    <FavoriteBorder className="text-[1.6em]" />
                  </span>
                  <span>10K</span>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <span>
                    <i className="fa-regular fa-comment text-[1.6em]"></i>
                  </span>
                  <span>10K</span>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <span>
                    <i className="fa-regular fa-share-from-square text-[1.4em]"></i>
                  </span>
                  <span>10K</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 px-1">
                <span>
                  <EmojiEmotions />
                </span>
                <TextField placeholder="Post a comment" className="w-[85%]" />
                <span>POST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
