import { Skeleton } from "@mui/material";
import React from "react";

const UserPostSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex" id="postId">
      <div className="h-full min-h-full w-full xl:w-3/5 p-2 md:px-4 flex flex-col gap-4 relative border items-center">
        <div className="flex gap-2 w-full md:w-3/5">
          <div>
            <Skeleton variant="circular" className="w-14 h-14" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Skeleton
              variant="rectangular"
              className="w-full h-[30em] rounded-md"
            />
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Skeleton variant="circular" className="w-7 h-7" />
                <Skeleton
                  variant="rectangular"
                  className="w-14 h-7 rounded-md"
                />
                <Skeleton
                  variant="rectangular"
                  className="w-14 h-7 rounded-md"
                />
                <Skeleton
                  variant="rectangular"
                  className="w-14 h-7 rounded-md"
                />
              </div>
              <div>
                <Skeleton
                  className="w-16 h-7 rounded-md"
                  variant="rectangular"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden h-full w-2/5 border-2 md:flex flex-col justify-center gap-3">
        <div className="flex w-full h-[3.5em] gap-2 p-1 ">
          <Skeleton variant="circular" className="w-1/2 h-full rounded-md" />
          <Skeleton variant="circular" className="w-1/2 h-full rounded-md" />
        </div>
        <div className="h-[calc(100%_-_3.5em)] overflow-auto w-full flex flex-col gap-2 p-2">
          {Array(15)
            .fill("")
            .map((data, index) => {
              return (
                <Skeleton
                  key={index}
                  variant="circular"
                  className="w-2/3 h-full rounded-md"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserPostSkeleton;
