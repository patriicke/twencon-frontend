import { Button, TextField } from "@mui/material";
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { useSelector } from "react-redux";
import HomePageContext from "../../context/HomePageContext";
import Person from "./../../assets/person/person.png";
import api from "./../../api";
import Loading from "./../../assets/loading/loading.gif";
import { telephoneCheck, uploadImage } from "../../hooks";
import { useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser";
const EditProfile: React.FC<{ userAccount: any }> = ({ userAccount }) => {
  const userData = useSelector((state: any) => state?.user?.userData);
  const navigate = useNavigate();
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
  const [user, setUser] = useState<any>({});
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false);
  const [passwordUpdateAlert, setPasswordUpdateAlert] =
    useState<boolean>(false);
  const [passwordUpdateLoading, setPasswordUpdateLoading] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<any>({
    confirmPassword: false,
    currentPassword: false,
    password: false
  });
  const [wordCount, setWordCount] = useState<number>(0);
  const [updateUserError, setUpdateUserError] = useState<{
    fullname: boolean;
    username: boolean;
    telephone: boolean;
    userNameExist: boolean;
    invalidTelephone: boolean;
    telephoneExist: boolean;
  }>({
    fullname: false,
    username: false,
    telephone: false,
    userNameExist: false,
    invalidTelephone: false,
    telephoneExist: false
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
    setPreviewImage(null);
    setImage(null);
  };
  useEffect(() => {
    setUser(userData);
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
  useEffect(() => {
    if (previewImage) return setCheckUpdate(true);
    if (userData?.username != user?.username) return setCheckUpdate(true);
    if (userData?.fullname != user?.fullname) return setCheckUpdate(true);
    if (userData?.profile != user?.profile) return setCheckUpdate(true);
    if (userData?.telephone != user?.telephone) return setCheckUpdate(true);
    setCheckUpdate(false);
  }, [user, previewImage]);
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
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUpdating(true);
      if (user?.fullname == "")
        return setUpdateUserError((error: any) => {
          return { ...error, fullname: true };
        });
      if (user?.username == "")
        return setUpdateUserError((error: any) => {
          return { ...error, username: true };
        });
      if (user?.telephone == "")
        return setUpdateUserError((error: any) => {
          return { ...error, telephone: true };
        });
      if (!telephoneCheck(user.telephone))
        return setUpdateUserError((error: any) => {
          return { ...error, invalidTelephone: true };
        });
      let request = await api.post("/auth/user/update", { user });
      let response = request.data;
      if (image) {
        try {
          await uploadImage(image, setUpdating, response.email);
        } catch (error) {
          console.log(error);
          return;
        }
      }
      setImage(null);
      setPreviewImage(null);
      setUpdateSuccess(true);
      setUser(response);
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message.includes("username"))
        setUpdateUserError((error: any) => {
          return { ...error, userNameExist: true };
        });
      if (error.response.data.message.includes("telephone"))
        setUpdateUserError((error: any) => {
          return { ...error, telephoneExist: true };
        });
    } finally {
      setUpdating(false);
    }
  };
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [messageError, setMessageError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [sendingMessageLoading, setSendingMessageLoading] =
    useState<boolean>(false);
  const form = useRef<any>(null);
  const sendEmail = (e: any) => {
    try {
      e.preventDefault();
      setSendingMessageLoading(true);
      if (title == "") {
        return setTitleError(true);
      }
      if (message == "") {
        return setMessageError(true);
      }
      emailjs
        .sendForm(
          "service_2zyhxvo",
          "template_fgju61e",
          form.current,
          "m9V5ZuTC_c4g8ostk"
        )
        .then(
          (result: any) => {
            console.log(result.text);
          },
          (error: any) => {
            console.log(error.text);
          }
        );
      e.target.reset();
      setMessage("")
      setTitle("")
    } catch (error) {
      console.log(error);
    } finally {
      setSendingMessageLoading(false);
    }
  };
  return (
    <div
      className={`w-full xl:w-[60%] m-auto h-full p-2 md:p-5 border my-1 rounded-md bg-gray-100 flex flex-col gap-2`}
    >
      {updateSuccess && (
        <div className="absolute h-full w-full bg-gray-400 top-0 left-0 z-50 opacity-95 flex justify-center items-center">
          <div className="flex flex-col gap-2 p-3 border-2 rounded-md bg-white">
            <p className="font-medium">
              Your account has been updated successfully
            </p>
            <div className="flex justify-end items-center">
              <Button
                variant="contained"
                className="bg-blue-500"
                onClick={() => {
                  setUpdateSuccess(false);
                  navigate(`/user/${user.username}`);
                  document.location.replace(
                    `${document.location.origin}/user/${user.username}`
                  );
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
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
            <form onSubmit={updateUser}>
              <div className="py-2">
                <p className="text-[1.1em] opacity-60">Full names</p>
                <TextField
                  size="small"
                  autoComplete="off"
                  value={user?.fullname ? user?.fullname : ""}
                  error={updateUserError.fullname}
                  helperText={
                    updateUserError.fullname && "Enter your fullnames"
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser((user: any) => {
                      return { ...user, fullname: e.target.value };
                    });
                    setUpdateUserError((error: any) => {
                      return { ...error, fullname: false };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                <p className="text-[1.1em] opacity-60">Username</p>
                <TextField
                  size="small"
                  autoComplete="off"
                  error={
                    updateUserError.username || updateUserError.userNameExist
                  }
                  helperText={
                    (updateUserError.username && "Enter username") ||
                    (updateUserError.userNameExist &&
                      "This username is already taken")
                  }
                  value={user?.username ? user?.username : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser((user: any) => {
                      return { ...user, username: e.target.value };
                    });
                    setUpdateUserError((error: any) => {
                      return { ...error, username: false };
                    });
                    setUpdateUserError((error: any) => {
                      return { ...error, userNameExist: false };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                <p className="text-[1.1em] opacity-60">Telephone</p>
                <TextField
                  size="small"
                  autoComplete="off"
                  value={user?.telephone ? user?.telephone : ""}
                  error={
                    updateUserError.telephone ||
                    updateUserError.invalidTelephone ||
                    updateUserError.telephoneExist
                  }
                  helperText={
                    (updateUserError.telephone &&
                      "Enter your telephone number") ||
                    (updateUserError.invalidTelephone &&
                      "Invalid telephone number") ||
                    (updateUserError.telephoneExist &&
                      "This telephone number is already taken!")
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser((user: any) => {
                      return { ...user, telephone: e.target.value };
                    });
                    setUpdateUserError((error: any) => {
                      return {
                        ...error,
                        telephone: false,
                        invalidTelephone: false,
                        telephoneExist: false
                      };
                    });
                  }}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  className="bg-green-500 text-white"
                  disabled={!checkUpdate || updating}
                  type="submit"
                >
                  {updating ? <img src={Loading} className="w-5" /> : "UPDATE"}
                </Button>
              </div>
            </form>
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
            <p className="opacity-80 py-1">
              Send us problems you've got when using this application. You can
              also share your experiences by describing how you see the app.
            </p>
            <p className="opacity-50 py-1">
              Our support team will reach you in less than 5 minutes.
            </p>
            <form
              className="py-2 flex flex-col gap-2"
              onSubmit={sendEmail}
              ref={form}
            >
              <h1 className="font-medium opacity-60 py-1 ">TITLE</h1>
              <TextField
                size="small"
                name="subject"
                value={title ? title : ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setTitle(e.target.value);
                  setTitleError(false);
                }}
                autoComplete="off"
                className="w-[20em]"
                error={titleError}
                helperText={titleError && "This title can't be empty"}
              />
              <h1 className="font-medium opacity-60 py-1 ">MESSAGE</h1>
              <TextField
                name="user_name"
                className="hidden"
                value={user?.fullname}
              />
              <TextField
                name="user_email"
                className="hidden"
                value={user?.email}
              />
              <div className="relative  w-full sm:w-[30em]">
                <span className="border -top-9 right-0 absolute px-2 p-1 rounded-md">
                  {wordCount}/500
                </span>
                <textarea
                  name="message"
                  cols={30}
                  rows={10}
                  value={message ? message : ""}
                  className={`border ${
                    messageError
                      ? "border-red-500 outline-red-500"
                      : "outline-blue-500"
                  } text-[0.9em] p-1 w-full outline-1 outline-offset-2`}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setMessage(e.target.value);
                    setWordCount(e.target.value.length);
                    setMessageError(false);
                  }}
                  maxLength={500}
                ></textarea>
              </div>
              <div className="flex items-center justify-end  w-full sm:w-[30em] ">
                <Button
                  className="bg-blue-500 w-[6em] text-white"
                  variant="contained"
                  type="submit"
                  disabled={sendingMessageLoading}
                >
                  {
                    sendingMessageLoading ? <img src={Loading} />:"SEND"
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
