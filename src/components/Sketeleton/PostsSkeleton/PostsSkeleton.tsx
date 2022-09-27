import React from "react";
import { Skeleton } from "@mui/material";
const PostsSkeleton: React.FC = () => {
  return (
    <div
      className="w-full md:w-3/5 flex items-center justify-center h-full min-h-full overflow-auto flex-col mb-1"
      id="postId"
    >
      <div className="h-full min-h-full w-full xl:w-4/5 2xl:w-3/5 p-2 md:px-4 flex flex-col gap-4 relative">
        <div className="flex gap-2 w-full">
          <div>
            <Skeleton variant="circular" className="w-14 h-14" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Skeleton
              variant="rectangular"
              className="w-full h-10 rounded-md"
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
        {Array(10)
          .fill("")
          .map((data: any, index: any) => {
            return (
              <div className="flex gap-2 w-full" key={index}>
                <div>
                  <Skeleton variant="circular" className="w-14 h-14" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-[17em] rounded-md"
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
            );
          })}
      </div>
      <div></div>
    </div>
  );
};

export default PostsSkeleton;
