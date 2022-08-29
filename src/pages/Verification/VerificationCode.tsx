import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Navigation from "./../../components/Navigation";
import iphone12 from "./../../assets/iphone12/iphone12.png";
import Twencon from "./../../assets/logo/twencon.svg";
import Footer from "../../components/Footer";
import AppleStore from "./../../assets/stores/applestore.png";
import GoogleStore from "./../../assets/stores/googlestore.png";
import ReactInputVerificationCode from "react-input-verification-code";
import styled from "styled-components";

const StyledError = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.004em;
  color: #ef6c65;
`;

const StyledReactInputVerificationCode = styled.div`
  display: flex;
  justify-content: center;
  --ReactInputVerificationCode-itemWidth: 52px;
  --ReactInputVerificationCode-itemHeight: 55px;
  --ReactInputVerificationCode-itemSpacing: 8px;
  .ReactInputVerificationCode__item {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    border: 1px solid #ef6c65;
    border-radius: 4px;
    box-shadow: none;
  }
  .ReactInputVerificationCode__item.is-active {
    box-shadow: none;
    border: 2px solid #4200fe;
  }
`;

const VerificationCode: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navigation data={{ href: "/auth/login", title: "LOGIN" }} />
      <div className="flex items-center justify-evenly min-h-[85vh]">
        <div>
          <img src={iphone12} className={`w-80`} />
        </div>
        <div className="w-[25em] h-[35em] border p-5">
          <div className="flex items-center justify-center">
            <img src={Twencon} className={`w-32`} />
          </div>
          <div>
            <h1 className="font-medium text-blue-500 text-center pt-3 text-lg">
              ENTER VERIFICATION CODE WE'VE SENT
            </h1>
          </div>
          <div className="my-5">
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
              <StyledReactInputVerificationCode>
                <ReactInputVerificationCode
                  length={6}
                  value={value}
                  placeholder={""}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </StyledReactInputVerificationCode>
              <div className="flex space-y-5 flex-col">
                <Button
                  type="button"
                  className="bg-light-blue w-full"
                  variant="contained"
                >
                  VERIFY
                </Button>
                <Button
                  type="button"
                  className="bg-light-blue w-full"
                  variant="contained"
                >
                  RESEND CODE
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
