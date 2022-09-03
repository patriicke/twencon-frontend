import { Skeleton } from "@mui/material";
import React from "react";

const MessageSkeleton: React.FC = () => {
  return (
    <>
      {Array(6)
        .fill(1)
        .map((data: any, index) => {
          return (
            <div className="flex flex-col gap-2 overflow-hidden" key={index}>
              <div className="w-1/2 flex items-center gap-2 self-start">
                <Skeleton className="h-[3em] w-[3em]" variant="circular" />
                <Skeleton className="h-[4em] w-[12em]" variant="text" />
              </div>
              <div className="w-1/3 self-end ">
                <Skeleton className="h-[4em]" variant="text" />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MessageSkeleton;
