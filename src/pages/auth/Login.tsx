import React, { useEffect, useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "./../../components/Navigation";
import iphone12 from "./../../assets/iphone12/iphone12.png";
import Twencon from "./../../assets/logo/twencon.svg";
import Footer from "../../components/Footer";
import AppleStore from "./../../assets/stores/applestore.png";
import GoogleStore from "./../../assets/stores/googlestore.png";
import { ILoginData } from "../../interface";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({
    email: false,
    password: false
  });
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: ""
  });
  const loginElements = [
    {
      error: inputError.email,
      helperText:
        loginData.email === ""
          ? inputError.email && "Please enter your email"
          : inputError.email && "Invalid email",
      label: "Email",
      type: "email",
      name: "email"
    },
    {
      error: inputError.password,
      helperText:
        loginData.password === ""
          ? inputError.password && "Please enter your password"
          : inputError.password && "Invalid email or password",
      label: "Password",
      type: "password",
      name: "password"
    }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setInputError((current) => {
      return {
        ...current,
        [name]: false
      };
    });
    setLoginData((current) => {
      return {
        ...current,
        [name]: e.target.value
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (loginData.email == "" || !loginData.email.includes("@gmail.com")) {
        return setInputError((current) => {
          return {
            ...current,
            email: true
          };
        });
      }
      if (loginData.password == "") {
        return setInputError((current) => {
          return {
            ...current,
            password: true
          };
        });
      }
      console.log("logged in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navigation data={{ href: "/auth/signup", title: "SIGNUP" }} />
      <div className="flex items-center justify-evenly min-h-[85vh] max-w-[80em] m-auto">
        <div className="hidden md:block">
          <img src={iphone12} className={`w-80`} />
        </div>
        <div className="w-[25em] h-[35em] border p-5">
          <div className="flex items-center justify-center">
            <img
              src={Twencon}
              className={`w-32 cursor-pointer`}
              onClick={() => navigate("/")}
            />
          </div>
          <div>
            <h1 className="font-medium text-blue-500 text-center pt-3 text-lg">
              LOGIN
            </h1>
          </div>
          <div className="my-5">
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
              {loginElements.map((data, index) => {
                return (
                  <TextField
                    key={index}
                    error={data.error}
                    label={data.label}
                    value={loginData[data.name as keyof ILoginData]}
                    type={data.type}
                    helperText={data.helperText}
                    onChange={handleChange}
                    name={data.name}
                    autoComplete={"off"}
                  />
                );
              })}
              <div className="flex space-x-5">
                <Button
                  type="submit"
                  className="bg-light-blue w-full"
                  variant="contained"
                >
                  LOGIN
                </Button>
              </div>
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
                  Don't have an account?
                </Link>
                <Link
                  className="text-[1.1em] text-red-500 hover:underline cursor-pointer"
                  underline="none"
                  onClick={() => {
                    navigate("/password/reset");
                  }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="text-center p-2">GET APP ON</div>
            <div className=" flex justify-between">
              <img src={AppleStore} className={`w-40  cursor-pointer`} />
              <img src={GoogleStore} className={`w-40 cursor-pointer`} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
