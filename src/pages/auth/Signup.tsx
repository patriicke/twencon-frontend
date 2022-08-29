import React, { useEffect, useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "./../../components/Navigation";
import iphone12 from "./../../assets/iphone12/iphone12.png";
import Twencon from "./../../assets/logo/twencon.svg";
import Footer from "../../components/Footer";
import AppleStore from "./../../assets/stores/applestore.png";
import GoogleStore from "./../../assets/stores/googlestore.png";
interface ISignupData {
  fullname: string;
  email: string;
  username: string;
  telephone: string;
  password: string;
  cpassword: string;
}
const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState<number>(1);
  const [inputError, setInputError] = useState({
    fullname: false,
    email: false,
    password: false,
    telephone: false,
    username: false,
    cpassword: false
  });
  const signupElements = [
    {
      error: inputError.fullname,
      helperText: inputError.fullname && "Name can't be empty",
      label: "Full Name",
      type: "text",
      name: "fullname",
      show: 1
    },
    {
      error: inputError.email,
      helperText: inputError.email && "Email can't be empty",
      label: "Email",
      type: "text",
      name: "email",
      show: 1
    },
    {
      error: inputError.password,
      helperText: inputError.password && "Password can't be empty",
      label: "Username",
      type: "text",
      name: "username",
      show: 1
    },
    {
      error: inputError.telephone,
      helperText: inputError.telephone && "Telephone can't be empty",
      label: "Telephone",
      type: "tel",
      name: "telephone",
      show: 2
    },
    {
      error: inputError.password,
      helperText: inputError.password && "Password can't be empty",
      label: "Password",
      type: "password",
      name: "password",
      show: 2
    },
    {
      error: inputError.cpassword,
      helperText: inputError.cpassword && "Confirm Password can't be empty",
      label: "Confirm Password",
      type: "password",
      name: "cpassword",
      show: 2
    }
  ];
  const [signupData, setSignupData] = useState<ISignupData>({
    fullname: "",
    email: "",
    username: "",
    telephone: "",
    password: "",
    cpassword: ""
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

  useEffect(() => {
    console.log(signupData);
  }, [signupData]);
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
              SIGN UP
            </h1>
          </div>
          <div className="my-5">
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
              {signupElements.map((data, index) => {
                return (
                  data.show === showInput && (
                    <TextField
                      key={index}
                      error={data.error}
                      label={data.label}
                      value={signupData[data.name as keyof ISignupData]}
                      type={data.type}
                      helperText={data.helperText}
                      onChange={handleChange}
                      name={data.name}
                      autoComplete={"off"}
                    />
                  )
                );
              })}
              <div className="flex space-x-5">
                <Button
                  type="button"
                  className="bg-light-blue w-1/2"
                  variant="contained"
                  disabled={showInput === 1}
                  onClick={() => {
                    setShowInput(1);
                  }}
                >
                  BACK
                </Button>
                <Button
                  type={showInput === 1 ? "button" : "submit"}
                  className="bg-light-blue w-1/2"
                  variant="contained"
                  onClick={() => {
                    showInput < 2 ? setShowInput(2) : null;
                  }}
                >
                  {showInput === 1 ? "NEXT" : "SIGNUP"}
                </Button>
              </div>
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
export default Signup;
