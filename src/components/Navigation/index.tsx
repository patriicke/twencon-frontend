import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "./../../assets/logo/twencon.svg";
import { NavBarProps } from "./../../interface/";
import { useScrollPosition } from "../../hooks";
const Navigation: React.FC<NavBarProps> = ({ data }) => {
  const navigate = useNavigate();
  const scrollPosition = useScrollPosition();
  return (
    <div
      className={`w-full h-20  flex items-center justify-between px-5 sticky top-0 bg-white z-50 ${
        scrollPosition > 0 ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-center">
        <img
          src={Logo}
          alt="Logo"
          className="w-32 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex items-center">
        {data?.title && (
          <Button
            className="bg-light-blue"
            variant="contained"
            onClick={() => {
              navigate(data?.href?.toString());
            }}
          >
            {data?.title}
          </Button>
        )}
      </div>
    </div>
  );
};
export default Navigation;
