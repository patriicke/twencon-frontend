import React from "react";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center">
      <img
        src="https://images.unsplash.com/photo-1488998287214-1e668a8e0dc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        className="w-4/6 h-screen"
      />
      <div className={`flex flex-col w-2/6 p-20`}>
        <form className="flex flex-col space-y-3">
          <TextField />
          <TextField />
          <Button type="submit" className="bg-light-blue" variant="contained">
            LOGIN
          </Button>
        </form>
        <div>
          <div className="flex justify-between py-3 text-[0.8em] ">
            <Link
              className="text-[1.1em] hover:underline cursor-pointer"
              underline="none"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have account?
            </Link>
            <Link
              className="text-[1.1em] text-red-500 hover:underline cursor-pointer"
              underline="none"
              onClick={() => {
                navigate("/");
              }}
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
