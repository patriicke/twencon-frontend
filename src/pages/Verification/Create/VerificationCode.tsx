import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Navigation from "../../../components/Navigation";
import iphone12 from "./../../../assets/iphone12/iphone12.png";
import Twencon from "./../../../assets/logo/twencon.svg";
import Footer from "../../../components/Footer";
import AppleStore from "./../../../assets/stores/applestore.png";
import GoogleStore from "./../../../assets/stores/googlestore.png";
import ReactInputVerificationCode from "react-input-verification-code";
import tick from "./../../../assets/success/tick.png";
import styled from "styled-components";
import Loading from "./../../../assets/loading/loading.gif";
import { useNavigate } from "react-router-dom";
import {
  useVerifyUserVerificationCode,
  useResendCreateVerificationCode
} from "./../../../hooks";
import { useDispatch } from "react-redux";
import { userDataAction } from "../../../features/user/userSlice";

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

const VerificationCode: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [serverMsg, setServerMsg] = useState<boolean>(false);
  const [resend, setResend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (value == "") return setError(true);
      await useVerifyUserVerificationCode(
        {
          v_code: value,
          acc_token: localStorage.getItem("acc_token")
        },
        dispatch,
        navigate,
        userDataAction,
        setLoading,
        setServerMsg
      );
    } catch (error) {
      console.log(error);
    }
  };

  const resendCode = async () => {
    await useResendCreateVerificationCode(
      {
        v_reference: localStorage.getItem("v_reference")
      },
      setResend,
      setLoading
    );
  };

  return (
    <div>
      <Navigation data={{ href: "/auth/login", title: "LOGIN" }} />
      <div className="flex items-center justify-evenly min-h-[85vh] max-w-[80em] m-auto">
        <div className="hidden md:block">
          <img src={iphone12} className={`w-80`} />
        </div>
        <div
          className={`w-[25em] h-[35em] border p-5`}
        >
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
              Enter verification code we've sent to your email!
            </p>
          </div>
          {resend && (
            <div className="border p-2 relative pt-3 mt-3 rounded-md">
              <p className="text-center text-green-500">
                Check your email we've resend the code to you!
              </p>
              <img src={tick} className="w-8 absolute -top-4 left-[45%]" />
            </div>
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
                    setResend(false);
                    setServerMsg(false);
                  }}
                />
              </StyledReactInputVerificationCode>
              {serverMsg && (
                <p className="text-[red] opacity-90 border border-red-300 text-center">
                  Invalid verification code. Please enter valid one!
                </p>
              )}
              {error && (
                <p className="text-red-500 opacity-70 border border-red-300 text-center">
                  Please enter code we've sent to you!
                </p>
              )}
              <div className="flex space-y-5 flex-col">
                <Button
                  type="submit"
                  className="bg-light-blue w-full"
                  variant="contained"
                >
                  {loading ? <img src={Loading} className="w-8" /> : "CONFIRM"}
                </Button>
                <Button
                  type="button"
                  className="bg-light-blue w-full"
                  variant="contained"
                  onClick={resendCode}
                >
                  {loading ? (
                    <img src={Loading} className="w-8" />
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
export default VerificationCode;
