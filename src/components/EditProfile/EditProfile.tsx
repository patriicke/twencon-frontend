import { TextField } from "@mui/material";
import React, { ReactElement, useContext, useState } from "react";
import { useSelector } from "react-redux";
import HomePageContext from "../../context/HomePageContext";
import Person from "./../../assets/person/person.png";
const EditProfile: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const { setIsEditProfile } = useContext<any>(HomePageContext);
  const [activeNavigation, setActiveNavigation] = useState<number>(0);
  const navigations: {
    component: ReactElement;
    content: string;
  }[] = [
    {
      component: <i className="fa-regular fa-user"></i>,
      content: "Account"
    },
    {
      component: <i className="fa-solid fa-lock"></i>,
      content: "Password"
    },
    {
      component: <i className="fa-regular fa-life-ring"></i>,

      content: "Help"
    }
  ];
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  // const [fullName, setFullName] = useState<string>("");
  return (
    <div
      className={`w-full xl:w-[60%] m-auto h-full p-2 md:p-5 border my-1 rounded-md bg-gray-100 flex flex-col gap-2`}
    >
      <div className="flex gap-3 border-b h-24">
        <div
          className="w-20 h-20 rounded-full p-1 bg-gray-200"
          onClick={() => {
            sessionStorage.setItem("edit", "false");
            setIsEditProfile(false);
          }}
        >
          <img
            src={user?.profile == "icon" ? Person : user?.profile}
            alt=""
            className="w-full h-full rounded-full hover:opacity-80 cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 ">
          <h1 className="font-medium text-[1.3em]">Account Settings</h1>
          <p className="opacity-75">Change your profile and account settings</p>
        </div>
      </div>
      <div className="flex w-full h-[calc(100%_-_6rem)] rounded-md bg-white border shadow-lg">
        <div className="w-1/4 flex flex-col gap-3 p-2 md:p-8 border-r-2 border-gray-300">
          {navigations.map((data, index) => {
            return (
              <div
                key={index}
                className={`flex gap-3 cursor-pointer items-center ${
                  activeNavigation !== index && "opacity-70"
                } 
                 hover:opacity-80`}
                onClick={() => {
                  setActiveNavigation(index);
                }}
              >
                <span
                  className={`md:text-[1.2em] ${
                    activeNavigation == index && "text-blue-500"
                  } hidden sm:block`}
                >
                  {data.component}
                </span>
                <span
                  className={`md:text-[1.3em] first-letter:
                  ${activeNavigation == index && "font-medium"}
                
                `}
                >
                  {data.content}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-3/4 p-8">
          <div className={`${activeNavigation == 0 ? "" : "hidden"}`}>
            <h1 className="font-medium text-[1.3em]">General Info</h1>
            <div className="flex flex-wrap"></div>
          </div>
          <div className={`${activeNavigation == 1 ? "" : "hidden"}`}>
            <h1 className="font-medium text-[1.3em]">Change your password</h1>
          </div>
          <div className={`${activeNavigation == 2 ? "" : "hidden"}`}>Help</div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
