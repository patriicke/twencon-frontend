import { Skeleton } from "@mui/material";
import React from "react";

const PhotoSkeleton: React.FC = () => {
  return (
    <div className="border-2 rounded-full border-gray-300">
      <Skeleton variant="circular" className="w-10 h-10 " />
    </div>
  );
};

export default PhotoSkeleton;
