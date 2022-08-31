import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Navigation from "../../../components/Navigation";
import iphone12 from "./../../../assets/iphone12/iphone12.png";
import Twencon from "./../../../assets/logo/twencon.svg";
import Footer from "../../../components/Footer";
import AppleStore from "./../../../assets/stores/applestore.png";
import GoogleStore from "./../../../assets/stores/googlestore.png";
import ReactInputVerificationCode from "react-input-verification-code";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "./../../../api";
import Loading from "./../../../assets/loading/loading.gif";
import tick from "./../../../assets/success/tick.png";
const StyledReactInputVerificationCode = styled.div`
  display: flex;
  justify-content: center;
  --ReactInputVerificationCode-itemWidth: 52px;
  --ReactInputVerificationCode-itemHeight: 55px;
  --ReactInputVerificationCode-itemSpacing: 8px;
  .ReactInputVerificationCode__item {
    font-size: 24px;
    font-weight: 500;
    color: #000;
    border: 1px solid #4200fe;
    border-radius: 4px;
    box-shadow: none;
  }
  .ReactInputVerificationCode__item.is-active {
    box-shadow: none;
    border: 2px solid #20ff0d;
  }
`;

const VerificationResetPwd: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendError, setResendError] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (value == "" || value.length < 6) return setError(true);
      const request = await api.post("/verification/reset/verify", {
        r_code: value,
        r_reference: localStorage.getItem("r_reference")
      });
      const response = request.data;
      localStorage.setItem("reset_token", response.reset_token);
      setLoading(false);
      return navigate("/password/reset/new");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const resendCode = async () => {
    try {
      setLoading(true);
      const request = await api.post("/verification/reset/resend", {
        r_reference: localStorage.getItem("r_reference")
      });
      const response = request.data;
      localStorage.setItem("r_reference", response.r_reference);
      setLoading(false);
      setResendSuccess(true);
    } catch (error) {
      setLoading(false);
      setResendError(true);
      console.log(error);
    }
  };
  return (
    <div>
      <Navigation data={{ href: "/auth/login", title: "LOGIN" }} />
      <div className="flex items-center justify-evenly min-h-[85vh] max-w-[80em] m-auto">
        <div className="hidden md:block">
          <img src={iphone12} className={`w-80`} />
        </div>
        <div className="w-[25em] h-[35em] border p-5">
          <div className="flex items-center justify-center">
            <img
              src={Twencon}
              className={`w-32 cursor-pointer`}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div>
            <p className="font-medium text-center pt-3 opacity-70">
              Enter reset code we've sent to your email!
            </p>
          </div>
          {resendSuccess && (
            <p className="text-green-500 opacity-70 border border-gray-600 rounded-sm  text-center p-2 mt-3 relative">
              <img src={tick} className="absolute w-7 -top-4 left-[45%]" />
              Please enter reset code we've sent to you!
            </p>
          )}
          <div className="my-5">
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
              <StyledReactInputVerificationCode>
                <ReactInputVerificationCode
                  length={6}
                  value={value}
                  placeholder={""}
                  onChange={(newValue) => {
                    setValue(newValue);
                    setError(false);
                    setResendError(false);
                    setResendSuccess(false);
                  }}
                />
              </StyledReactInputVerificationCode>
              {error && (
                <p className="text-red-500 opacity-70 border border-red-300 text-center">
                  Please enter reset code we've sent to you!
                </p>
              )}
              {resendError && (
                <p className="text-red-500 opacity-70 border border-red-300 text-center">
                  Sorry! You are not allowed to perform this action!
                </p>
              )}
              <div className="flex space-y-5 flex-col">
                <Button
                  type="submit"
                  className="bg-light-blue w-full"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <img src={Loading} className="w-7" /> : "RESET"}
                </Button>
                <Button
                  type="button"
                  className="bg-light-blue w-full"
                  variant="contained"
                  disabled={loading}
                  onClick={resendCode}
                >
                  {loading ? (
                    <img src={Loading} className="w-7" />
                  ) : (
                    "RESEND CODE"
                  )}
                </Button>
              </div>
            </form>
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
export default VerificationResetPwd;
