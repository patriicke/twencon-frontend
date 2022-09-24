import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../hooks";
import Person from "./../../assets/person/person.png";
import HomePageContext from "../../context/HomePageContext";
const SuggestionComponent: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();
  const { current, setCurrent } = useContext<any>(HomePageContext);
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <div className="hidden w-2/5 border md:flex items-center justify-center h-full">
      <div className="h-full w-4/5 flex flex-col gap-2">
        <h1>Suggestions for you</h1>
        <div className="flex flex-col gap-2 ">
          {users
            ?.filter((currentUser: any) => {
              return currentUser?._id != user?._id;
            })
            ?.map((data: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-between p-1 rounded-lg bg-gray-100  hover:bg-gray-300"
                >
                  <div
                    className="flex gap-2 items-center justify-between cursor-pointer"
                    onClick={() => {
                      navigate(`/${data?.username}`);
                      setCurrent(4);
                    }}
                  >
                    <img
                      src={data?.profile == "icon" ? Person : data?.profile}
                      alt={data?.fullname}
                      className="w-12 rounded-full border-2"
                    />
                    <div className="text-[0.8em]">
                      <div>{data?.fullname}</div>
                      <div className="text-blue-500">@{data?.username}</div>
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white p-1 px-3 text-[0.8em] rounded-[2em]">
                    Follow
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      {/* <div>a</div> */}
    </div>
  );
};

export default SuggestionComponent;
