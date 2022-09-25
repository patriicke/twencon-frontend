import { Cancel } from "@mui/icons-material";
import React, { useContext } from "react";
import HomePageContext from "../../context/HomePageContext";

const Post: React.FC = () => {
  const { showPost, setShowPost } = useContext<any>(HomePageContext);
  return (
    <div className="w-full h-full absolute top-0 bg-white opacity-80">
      <button
        className="absolute top-3 right-3"
        onClick={() => setShowPost(false)}
      >
        <Cancel className="text-red-500 text-[1.6em]" />
      </button>
      <div>Showing posts</div>
    </div>
  );
};

export default Post;
