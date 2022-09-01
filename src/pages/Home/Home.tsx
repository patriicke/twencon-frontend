import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../hooks";
import { userDataAction } from "../../features/user/userSlice";
import Logo from "./../../assets/logo/logo.png";
import {
  AccountCircle,
  Apps,
  FavoriteBorder,
  Menu,
  Notifications,
  Search
} from "@mui/icons-material";
import ChatIcon from "../../components/ChatIcon/ChatIcon";
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
  }, []);
  const navigations: {
    icons: any;
    name: string;
  }[] = [
    {
      icons: <Apps className="text-[2em]" />,
      name: "Home"
    },
    {
      name: "Favorite",
      icons: <FavoriteBorder className="text-[2em]" />
    },
    {
      icons: <Notifications className="text-[2em]" />,
      name: "Notifications"
    },
    {
      icons: <ChatIcon className="w-8" />,
      name: "Messages"
    },
    {
      icons: (
        <div className="border-2 rounded-full p-[0.1em]">
          <img src={userData?.profile} className="w-10 rounded-full" />
        </div>
      ),
      name: "Account"
    }
  ];
  return (
    <div className="relative overflow-hidden">
      <div className="h-[93vh] min-h-[40em] overflow-auto">
        <div className="flex p-2 px-4 justify-between shadow-lg">
          <div className="w-10 flex items-center">
            <img src={Logo} />
          </div>
          <div className="hidden">
            {navigations.map((data, index) => {
              return (
                <div key={index}>
                  {index === current && (
                    <div className="" key={index}>
                      <div>{data.icons}</div>
                      <h1 className="hidden text-[1.5em] font-medium">
                        {data.name}
                      </h1>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex">
            <div className="flex items-center justify-end">
              <input className="w-[70%] outline-none" placeholder="Search..." />
              <Search className="text-[1.5em] cursor-pointer" />
            </div>
            <div className="hidden border-2 rounded-full p-[0.1em]">
              <img src={userData?.profile} className="w-10 rounded-full" />
            </div>
          </div>
        </div>
        <div>All data</div>
      </div>
      <div className="bg-white h-[7vh] min-h-[4em] w-full flex px-4 border-t-2 fixed bottom-0">
        <div className="hidden">
          <Menu className="text-[2.5em] text-gray-600" />
        </div>
        <div className="h-full w-full flex-shrink flex items-center justify-between">
          {navigations.map((data, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => setCurrent(index)}
              >
                {data.icons}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
