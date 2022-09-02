import { Add, Search } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SideBar: React.FC = () => {
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  return (
    <div className="w-1/4 h-full border p-3">
      <div className="flex justify-between items-center">
        <div className="font-medium text-[1.3em]">Chats</div>
        <div className="flex w-[65%] justify-between items-center">
          <div className="border p-1 rounded-md">
            <input
              className="border-none outline-none"
              placeholder="Search..."
            />
            <Search className="cursor-pointer" />
          </div>
          <Add className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
