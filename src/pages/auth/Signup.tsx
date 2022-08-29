import React, { useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "./../../components/Navigation";
interface ISignupData {
  name: string;
  email: string;
  password: string;
}
const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({
    name: false,
    email: false,
    password: false
  });
  const signupElements = [
    {
      error: inputError.name,
      helperText: inputError.name && "Name can't be empty",
      label: "Enter your name",
      type: "text",
      name: "name"
    },
    {
      error: inputError.email,
      helperText: inputError.email && "Email can't be empty",
      label: "Enter your email",
      type: "text",
      name: "email"
    },
    {
      error: inputError.password,
      helperText: inputError.password && "Password can't be empty",
      label: "Enter your password",
      type: "password",
      name: "password"
    }
  ];
  const [signupData, setSignupData] = useState<ISignupData>({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setSignupData((current) => {
      return {
        ...current,
        [name]: e.target.value
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navigation data={{ href: "#", title: "LOGIN" }} />
    </div>
  );
};
export default Signup;
/*
<div className="flex w-full h-screen flex-col md:flex-row overflow-auto">
      <div>
        <img src="https://images.unsplash.com/photo-1488998287214-1e668a8e0dc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      </div>
      <div
        className={`flex flex-col w-full justify-center p-5 md:w-3/4 md:p-2 lg:w-2/6 lg:p-5 xl:p-7 2xl:p-10`}
      >
        <div>
          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
            {signupElements.map((data, index) => {
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
              Signup
            </Button>
          </form>
          <div>
            <div className="flex justify-between py-3 text-[0.8em] ">
              <Link
                className="text-[1.1em] hover:underline cursor-pointer text-light-blue"
                underline="none"
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                Already have account?
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
    </div>
*/
