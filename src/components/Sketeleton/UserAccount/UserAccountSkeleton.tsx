import React from "react";
import { Skeleton } from "@mui/material";
const UserAccountSkeleton: React.FC = () => {
  return (
    <div className="h-full">
      <div className="h-[20em]">
        <div className="bg-gray-200 h-1/2 rounded-md relative">
          <div className="absolute -bottom-14 left-5 w-[10em] h-[10em] z-50 bg-gray-500 rounded-full"></div>
          <Skeleton
            className="rounded-full w-[6em] h-[2.5em] absolute right-3 bottom-3 border p-2 px-4 cursor-pointer opacity-80 font-semibold"
            variant="rectangular"
          />
        </div>
        <div className="h-1/2 bg-white p-2 pt-16">
          <div className="flex gap-2">
            <Skeleton
              className="font-bold rounded-md w-[10em] h-[2em]"
              variant="rectangular"
            />
            <Skeleton
              className="font-bold rounded-md w-[10em] h-[2em]"
              variant="rectangular"
            />
          </div>
          <div className="flex py-2 gap-3 text-[1.2em]">
            <div className="flex gap-2 cursor-pointer">
              <Skeleton
                className="font-bold rounded-md w-[7em] h-[2em]"
                variant="rectangular"
              />
            </div>
            <div className="flex gap-2 cursor-pointer">
              <Skeleton
                className="font-bold rounded-md w-[7em] h-[2em]"
                variant="rectangular"
              />
            </div>
            <div className="flex gap-2">
              <Skeleton
                className="font-bold rounded-md w-[7em] h-[2em]"
                variant="rectangular"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap overflow-auto h-[calc(100%_-_20em)] justify-between">
        {Array(10)
          .fill("")
          .map((data: any, index: any) => {
            return (
              <Skeleton className="w-[18em] h-[18em]" variant="rectangular" />
            );
          })}
      </div>
    </div>
  );
};

export default UserAccountSkeleton;
