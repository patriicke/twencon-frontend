import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "./../../assets/logo/icons8-plesk-512.png";
import { NavBarProps } from "./../../interface/";
const Navigation: React.FC<NavBarProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-300 w-full h-16 shadow-md flex items-center justify-between px-5">
      <div className="flex items-center justify-center">
        <img src={Logo} alt="Logo" className="w-12" />
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
