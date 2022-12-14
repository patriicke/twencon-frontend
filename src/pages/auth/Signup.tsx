import React, { useEffect, useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "./../../components/Navigation";
import iphone12 from "./../../assets/iphone12/iphone12.png";
import Twencon from "./../../assets/logo/twencon.svg";
import Footer from "../../components/Footer";
import AppleStore from "./../../assets/stores/applestore.png";
import GoogleStore from "./../../assets/stores/googlestore.png";
import { ISignupData } from "../../interface";
import { useDispatch } from "react-redux";
import { userDataAction } from "./../../features/user/userSlice";
import api from "./../../api/";
import Loading from "./../../assets/loading/loading.gif";
const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<number>(1);
  const [inputError, setInputError] = useState({
    fullname: false,
    email: false,
    password: false,
    telephone: false,
    username: false,
    cpassword: false,
    emailExist: false,
    usernameExist: false,
    telephoneExist: false,
    invalidTelephoneNumber: false
  });
  const [signupData, setSignupData] = useState<ISignupData>({
    fullname: "",
    email: "",
    username: "",
    telephone: "",
    password: "",
    cpassword: ""
  });
  const signupElements = [
    {
      error: inputError.fullname,
      helperText: inputError.fullname && "Please enter your fullnames",
      label: "Full Name",
      type: "text",
      name: "fullname",
      show: 1
    },
    {
      error: inputError.email || inputError.emailExist,
      helperText:
        signupData.email == ""
          ? inputError.email && "Please enter your email"
          : (inputError.email && "Please enter valid email") ||
            (inputError.emailExist &&
              "This email is already taken use another email!"),
      label: "Email",
      type: "text",
      name: "email",
      show: 1
    },
    {
      error: inputError.username || inputError.usernameExist,
      helperText:
        signupData.username == ""
          ? inputError.username && "Please enter your username"
          : (inputError.username && "Try using another username") ||
            (inputError.usernameExist && "Try using another username"),
      label: "Username",
      type: "text",
      name: "username",
      show: 1
    },
    {
      error: inputError.telephone || inputError.telephoneExist,
      helperText:
        (inputError.telephone && "Please enter your telephone number") ||
        (inputError.telephoneExist && "Try using another phone number"),
      label: "Telephone",
      type: "tel",
      name: "telephone",
      show: 2
    },
    {
      error: inputError.password,
      helperText:
        signupData.password == ""
          ? inputError.password && "Password can't be empty"
          : inputError.password && "Password is too short",
      label: "Password",
      type: "password",
      name: "password",
      show: 2
    },
    {
      error: inputError.cpassword,
      helperText:
        signupData.cpassword == ""
          ? inputError.cpassword && "Please confirm your password"
          : inputError.cpassword && "Passwords don't match",
      label: "Confirm Password",
      type: "password",
      name: "cpassword",
      show: 2
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
    setInputError((current) => {
      return {
        ...current,
        emailExist: false,
        usernameExist: false,
        telephoneExist: false
      };
    });
    setSignupData((current) => {
      return {
        ...current,
        [name]: e.target.value
      };
    });
  };
  const firstFormSubmit = () => {
    if (signupData.fullname == "") {
      setLoading(false);
      setShowInput(1);
      return setInputError((current) => {
        return { ...current, fullname: true };
      });
    }
    if (signupData.email == "" || !signupData.email.includes("@gmail.com")) {
      setLoading(false);
      setShowInput(1);
      return setInputError((current) => {
        return {
          ...current,
          email: true
        };
      });
    }
    if (signupData.username == "") {
      setShowInput(1);
      setLoading(false);
      return setInputError((current) => {
        return {
          ...current,
          username: true
        };
      });
    }
    return setShowInput(2);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      firstFormSubmit();
      if (
        signupData.fullname == "" ||
        signupData.email == "" ||
        signupData.username == ""
      ) {
        return setShowInput(1);
      }
      if (signupData.telephone == "") {
        setLoading(false);
        setShowInput(2);
        return setInputError((current) => {
          return { ...current, telephone: true };
        });
      }
      if (signupData.password == "" || signupData.password.length < 6) {
        setLoading(false);
        setShowInput(2);
        return setInputError((current) => {
          return {
            ...current,
            password: true
          };
        });
      }
      if (signupData.cpassword == "") {
        setLoading(false);
        setShowInput(2);
        return setInputError((current) => {
          return {
            ...current,
            cpassword: true
          };
        });
      }
      if (signupData.password !== signupData.cpassword) {
        setLoading(false);
        setShowInput(2);
        return setInputError((current) => {
          return {
            ...current,
            cpassword: true
          };
        });
      }
      signupData.fullname = signupData.fullname.trim();
      signupData.email = signupData.email.trim();
      signupData.telephone = signupData.telephone.trim();
      signupData.username = signupData.username.trim();
      const request = await api.post("/auth/signup", { ...signupData });
      const response = request.data;
      localStorage.setItem("acc_token", response.accessToken);
      localStorage.setItem("v_reference", response.v_reference);
      setLoading(false);
      dispatch(userDataAction({ ...response }));
      return navigate("/create/verification");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      if (
        error.response.status == 406 &&
        error.response.data.message == "Username already exists"
      ) {
        setShowInput(1);
        return setInputError((current) => {
          return {
            ...current,
            usernameExist: true
          };
        });
      }
      if (
        error.response.status == 406 &&
        error.response.data.message == "Email already exists"
      ) {
        setShowInput(1);
        return setInputError((current) => {
          return {
            ...current,
            emailExist: true
          };
        });
      }
      if (
        error.response.status == 406 &&
        error.response.data.message == "Telephone already exists"
      ) {
        setShowInput(2);
        return setInputError((current) => {
          return {
            ...current,
            telephoneExist: true
          };
        });
      }
    }
  };
  return (
    <div>
      <Navigation data={{ href: "/auth/login", title: "LOGIN" }} />
      <div className="flex items-center justify-evenly min-h-[85vh] max-w-[80em] m-auto">
        <div className="hidden md:block">
          <img src={iphone12} className={`w-80`} />
        </div>
        <div className={`w-[25em] h-[35em] border p-5 `}>
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
                  disabled={showInput === 1 || loading}
                  onClick={() => {
                    setShowInput(1);
                  }}
                >
                  BACK
                </Button>
                <Button
                  type={"button"}
                  className={`bg-light-blue w-1/2 ${
                    showInput == 2 && "hidden"
                  }`}
                  variant="contained"
                  onClick={() => {
                    firstFormSubmit();
                  }}
                >
                  NEXT
                </Button>
                <Button
                  type={"submit"}
                  className={`bg-light-blue w-1/2 ${
                    showInput == 1 && "hidden"
                  }`}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <img src={Loading} className="w-8" /> : "SIGNUP"}
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
export default Signup;
