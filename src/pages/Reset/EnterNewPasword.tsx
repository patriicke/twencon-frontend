import React, { useState } from "react";
import Twencon from "./../../assets/logo/twencon.svg";
import { Button, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import api from "./../../api";
import Loading from "./../../assets/loading/loading.gif";
const EnterNewPasword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [cpassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordCError, setConfirmPasswordError] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (password == "") {
        setLoading(false);
        return setPasswordError(true);
      }
      if (password.length < 6) {
        setLoading(false);
        return setPasswordError(true);
      }
      if (password !== cpassword) {
        setLoading(false);
        return setConfirmPasswordError(true);
      }
      //   const request = await api.post("/verification/reset", { email });
      //   const response = request.data;
      //   console.log(response);
      //   setLoading(false);
      //   localStorage.setItem("r_reference", response.r_reference);
      //   navigate("/reset/verification ");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
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
          <p className="text-center opacity-60">Enter new password</p>
          <form
            className="py-2 flex flex-col space-y-3"
            onSubmit={handleSubmit}
          >
            <TextField
              label={"Password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              autoComplete={"off"}
              error={passwordError}
              helperText={
                password == ""
                  ? passwordError && "Enter your password!"
                  : passwordError && "This password is too short!"
              }
              size="medium"
              type={"password"}
            />
            <TextField
              label={"Confirm password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(false);
              }}
              autoComplete={"off"}
              error={passwordCError}
              helperText={
                cpassword == ""
                  ? passwordCError && "Please confirm your password!"
                  : passwordCError && "Passwords don't match!"
              }
              type={"password"}
              size="medium"
            />
            <Button
              variant="contained"
              className="bg-light-blue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <img src={Loading} className="w-7" />
              ) : (
                "RESET PASSWORD"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterNewPasword;
