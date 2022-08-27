import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./../../services/appApi";
import { AppContext } from "../../context/appContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { socket } = useContext<any>(AppContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({ email: loginData.email, password: loginData.password }).then(
      (data: any) => {
        if (data.error) console.log("I am giving error: ", data);
        else {
          console.log("I am giving data: ", data);
          socket.emit("new-user");
          navigate("/chat");
        }
      }
    );
  };
  const [inputError, setIputError] = useState({
    email: false,
    password: false
  });
  const loginElements = [
    {
      error: inputError.email,
      helperText: inputError.email && "Email can't be empty",
      label: "Enter your email",
      type: "text",
      name: "email"
    },
    {
      helperText: inputError.password && "Password can't be empty",
      label: "Enter your password",
      type: "password",
      name: "password"
    }
  ];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setLoginData((current) => {
      return {
        ...current,
        [name]: e.target.value
      };
    });
  };
  return (
    <div className="flex w-full h-screen flex-col lg:flex-row overflow-auto">
      <img
        src="https://images.unsplash.com/photo-1488998287214-1e668a8e0dc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        className="w-full md:block h-1/2 lg:h-screen lg:w-3/5 xl:w-4/6 min-h-[20em] "
      />
      <div
        className={`flex flex-col w-full justify-center p-5 lg:w-3/4 lg:p-2 xl:w-2/6 xl:p-5 2xl:p-10 `}
      >
        <p className="text-center text-light-blue">LOGIN TO CHATSP</p>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          {loginElements.map((data, index) => {
            return (
              <TextField
                key={index}
                error={data.error}
                label={data.label}
                type={data.type}
                helperText={data.helperText}
                onChange={handleChange}
                name={data.name}
                autoComplete={"off"}
              />
            );
          })}
          <Button type="submit" className="bg-light-blue" variant="contained">
            LOGIN
          </Button>
        </form>
        <div>
          <div className="flex justify-between py-3 text-[0.8em] ">
            <Link
              className="text-[1.1em] hover:underline cursor-pointer text-light-blue"
              underline="none"
              onClick={() => {
                navigate("/auth/signup");
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
