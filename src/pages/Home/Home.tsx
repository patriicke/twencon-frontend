import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../hooks";
import { userDataAction } from "../../features/user/userSlice";
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
  }, []);
  return <div className="h-screen w-full space-x-2 flex">Home</div>;
};

export default Home;
