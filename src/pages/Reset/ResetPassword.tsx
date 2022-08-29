import React, { ChangeEvent, useEffect, useState } from "react";
import tick from "./../../assets/success/tick.png";
import Twencon from "./../../assets/logo/twencon.svg";
import { Button, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email == "" || !email.includes("@gmail.com"))
        return setEmailError(true);
      navigate("/reset/verification ")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-hidden h-screen w-full">
      <Navigation />
      <div className="h-5/6 w-full flex items-center justify-center">
        <div className="bg-white shadow-lg w-[25em] h-[35em] border p-5 flex flex-col space-y-2">
          <div className="flex items-center justify-center">
            <img src={Twencon} className="w-28" />
          </div>
          <p className="font-normal text-center opacity-75">
            You're having problems with logging in?
          </p>
          <p className="text-center opacity-60">
            Enter you email and we'll automatically send you the link to confirm
            it's you.
          </p>
          <form
            className="py-2 flex flex-col space-y-3"
            onSubmit={handleSubmit}
          >
            <TextField
              label={"Email"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              error={emailError}
              helperText={
                email == ""
                  ? emailError && "Enter your email please"
                  : emailError &&
                    "This email doesn't exist. Please create an account!"
              }
              size="medium"
            />
            <Button variant="contained" className="bg-light-blue" type="submit">
              SEND CODE
            </Button>
          </form>
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
              className="text-[1.1em] text-light-blue hover:underline cursor-pointer"
              underline="none"
              onClick={() => {
                navigate("/auth/signup");
              }}
            >
              Don't have account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
