import { Button, TextField } from "@mui/material";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomePageContext from "../../context/HomePageContext";
import Person from "./../../assets/person/person.png";
import api from "./../../api";
import Loading from "./../../assets/loading/loading.gif";
const EditProfile: React.FC<{ userAccount: any }> = ({ userAccount }) => {
  const userData = useSelector((state: any) => state?.user?.userData);
  const { setIsEditProfile } = useContext<any>(HomePageContext);
  const [activeNavigation, setActiveNavigation] = useState<number>(0);
  const navigations: {
    component: ReactElement;
    content: string;
  }[] = [
    {
      component: <i className="fa-regular fa-user"></i>,
      content: "Account"
    },
    {
      component: <i className="fa-solid fa-lock"></i>,
      content: "Password"
    },
    {
      component: <i className="fa-regular fa-life-ring"></i>,

      content: "Help"
    }
  ];
  const [image, setImage] = useState<any>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [user, setUser] = useState<any>({});
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordUpdateAlert, setPasswordUpdateAlert] =
    useState<boolean>(false);
  const [passwordUpdateLoading, setPasswordUpdateLoading] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<any>({
    confirmPassword: false,
    currentPassword: false,
    password: false
  });
  const validateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file: any = e.target.files == null ? null : e.target.files[0];
    if ((file.size as number) > 1048576) {
      alert("Maximum file size should be atleast 1mb");
    } else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const removeProfileImage = () => {
    setUser((user: any) => {
      return { ...user, profile: "icon" };
    });
  };
  useEffect(() => {
    setUser(userData);
    setFullName(userData?.fullname);
    setUserName(userData?.username);
    setTelephone(userData?.telephone);
  }, [userData]);
  useEffect(() => {
    if (sessionStorage.getItem("edit") == "true") {
      if (user?._id != userAccount?._id) setIsEditProfile(false);
    }
  });
  useEffect(() => {
    let curShNv = sessionStorage.getItem("curShow");
    if (curShNv) setActiveNavigation(Number(curShNv));
  }, []);
  const updatePassword = async () => {
    try {
      setPasswordUpdateLoading(true);
      if (currentPassword == "")
        return setPasswordError((error: any) => {
          return { ...error, currentPassword: true };
        });
      if (password == "" || password.length < 6)
        return setPasswordError((error: any) => {
          return { ...error, password: true };
        });
      if (confirmPassword == "")
        return setPasswordError((error: any) => {
          return { ...error, confirmPassword: true };
        });
      if (confirmPassword != password)
        return setPasswordError((error: any) => {
          return { ...error, confirmPassword: true };
        });
      const request = await api.post("/auth/password/update", {
        email: user?.email,
        password,
        currentPassword
      });
      const response = request.data;
      if (response.message == "ugiser password updated successfully") {
        setPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
        setPasswordUpdateAlert(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message == "password don't match")
        setPasswordError((error: any) => {
          return { ...error, currentPassword: true };
        });
      if (
        error.response.data.message ==
        "use password different from previous one"
      )
        setPasswordError((error: any) => {
          return { ...error, password: true };
        });
    } finally {
      setPasswordUpdateLoading(false);
    }
  };
  return (
    <div
      className={`w-full xl:w-[60%] m-auto h-full p-2 md:p-5 border my-1 rounded-md bg-gray-100 flex flex-col gap-2`}
    >
      {passwordUpdateAlert && (
        <div className="absolute h-full w-full bg-gray-400 top-0 left-0 z-50 opacity-90 flex justify-center items-center">
          <div className="flex flex-col gap-2 p-3 border-2 rounded-md bg-white">
            <p className="font-medium">
              You have updated your password successfully
            </p>
            <div className="flex justify-end items-center">
              <Button
                variant="contained"
                className="bg-blue-500"
                onClick={() => {
                  setPasswordUpdateAlert(false);
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-3 border-b h-24">
        <div
          className="w-20 h-20 rounded-full p-1 bg-gray-200"
          onClick={() => {
            sessionStorage.setItem("edit", "false");
            setIsEditProfile(false);
          }}
        >
          <img
            src={user?.profile == "icon" ? Person : user?.profile}
            alt=""
            className="w-full h-full rounded-full hover:opacity-80 cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 ">
          <h1 className="font-medium text-[1.3em]">Account Settings</h1>
          <p className="opacity-75">Change your profile and account settings</p>
        </div>
      </div>
      <div className="flex w-full h-[calc(100%_-_6rem)] rounded-md bg-white border shadow-lg">
        <div className="w-1/4 flex flex-col gap-3 p-2 md:p-8 border-r-2 border-gray-300">
          {navigations.map((data, index) => {
            return (
              <div
                key={index}
                className={`flex gap-3 cursor-pointer items-center ${
                  activeNavigation !== index && "opacity-70 hover:opacity-90"
                } 
                 `}
                onClick={() => {
                  setActiveNavigation(index);
                  sessionStorage.setItem("curShow", index.toString());
                }}
              >
                <span
                  className={`md:text-[1.2em] ${
                    activeNavigation == index && "text-blue-500"
                  } hidden sm:block`}
                >
                  {data.component}
                </span>
                <span
                  className={`md:text-[1.3em] first-letter:
                  ${activeNavigation == index && "font-medium"}
                
                `}
                >
                  {data.content}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-3/4 p-2 md:py-8 md:pl-8">
          <div
            className={`${
              activeNavigation == 0 ? "" : "hidden"
            } h-full overflow-auto`}
          >
            <h1 className="font-medium text-[1.3em]">General Info</h1>
            <div className="flex flex-wrap flex-col py-2">
              <p className="text-[1.1em] opacity-60">
                {user?.profile == "icon"
                  ? "Upload profile picture"
                  : "Change your profile picture"}
              </p>
              <div className="flex flex-col gap-2">
                <div className="border-2 rounded-full w-24 h-24">
                  <img
                    src={
                      previewImage != null
                        ? previewImage
                        : user?.profile == "icon"
                        ? Person
                        : user?.profile
                    }
                    className="h-full w-full rounded-full"
                  />
                </div>
                <div className="flex gap-2 w-[10em] justify-between px-2">
                  <Button
                    variant="contained"
                    className="bg-blue-500 text-[0.75em]"
                  >
                    <label htmlFor="image-upload-update">
                      <p>UPLOAD</p>
                      <input
                        type="file"
                        id="image-upload-update"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={validateImage}
                      />
                    </label>
                  </Button>
                  {user?.profile != "icon" && (
                    <Button
                      variant="contained"
                      className="bg-red-500 hover:bg-[red] text-[0.75em]"
                      onClick={removeProfileImage}
                    >
                      REMOVE
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="py-2">
              <p className="text-[1.1em] opacity-60">Full names</p>
              <TextField
                size="small"
                autoComplete="off"
                value={fullName ? fullName : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
            <div className="py-2">
              <p className="text-[1.1em] opacity-60">Username</p>
              <TextField
                size="small"
                autoComplete="off"
                value={userName ? userName : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="py-2">
              <p className="text-[1.1em] opacity-60">Telephone</p>
              <TextField
                size="small"
                autoComplete="off"
                value={telephone ? telephone : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTelephone(e.target.value);
                }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                className="bg-green-500 text-white"
                disabled
              >
                UPDATE
              </Button>
            </div>
          </div>
          <div className={`${activeNavigation == 1 ? "" : "hidden"}`}>
            <h1 className="font-medium text-[1.3em]">Change your password</h1>
            <div className="py-2">
              <p className="text-[1.1em] opacity-60">Current password</p>
              <TextField
                size="small"
                autoComplete="off"
                value={currentPassword ? currentPassword : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCurrentPassword(e.target.value);
                  setPasswordError((error: any) => {
                    return { ...error, currentPassword: false };
                  });
                }}
                type="password"
                error={passwordError.currentPassword}
                helperText={
                  currentPassword == "" && passwordError.currentPassword
                    ? "Enter your current password"
                    : passwordError.currentPassword && "Incorrect password"
                }
              />
            </div>
            <div className="py-2">
              <p className="text-[1.1em] opacity-60">New password</p>
              <TextField
                size="small"
                autoComplete="off"
                value={password ? password : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  setPasswordError((error: any) => {
                    return { ...error, password: false };
                  });
                }}
                type="password"
                error={passwordError.password}
                helperText={
                  password == "" && passwordError.password
                    ? "Enter your password"
                    : passwordError.password && password.length < 6
                    ? "Password is too small"
                    : passwordError.password &&
                      "Try using password different a new password"
                }
              />
            </div>
            <div className="py-2">
              <p className="text-[1.1em] opacity-60">Confirm new password</p>
              <TextField
                size="small"
                autoComplete="off"
                value={confirmPassword ? confirmPassword : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError((error: any) => {
                    return { ...error, confirmPassword: false };
                  });
                }}
                type="password"
                error={passwordError.confirmPassword}
                helperText={
                  confirmPassword == "" && passwordError.confirmPassword
                    ? "Confirm youe password"
                    : passwordError.confirmPassword && "Passwords don't match"
                }
              />
            </div>
            <Button
              variant="contained"
              className="bg-green-500 text-white"
              onClick={() => {
                updatePassword();
              }}
              disabled={
                password == "" ||
                currentPassword == "" ||
                confirmPassword == "" ||
                passwordUpdateLoading
              }
            >
              {passwordUpdateLoading ? (
                <img src={Loading} className="w-5" />
              ) : (
                "UPDATE PASSWORD"
              )}
            </Button>
          </div>
          <div className={`${activeNavigation == 2 ? "" : "hidden"}`}>
            <h1 className="font-medium text-[1.3em]">Help</h1>
            <p className="opacity-70">
              Send here problems you've overcome with and you will be answered
              by our support team in few minutes.
            </p>
            <p className="opacity-70">
              You can also share experience you've got!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
