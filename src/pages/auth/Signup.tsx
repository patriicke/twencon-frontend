import React, { useEffect, useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { uploadImage } from "./../../hooks/index";
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
      error: inputError.name,
      helperText: inputError.email && "Email can't be empty",
      label: "Enter your email",
      type: "text",
      name: "email"
    },
    {
      error: inputError.name,
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
  useEffect(() => {
    console.log(signupData);
  }, [signupData]);
  //Uploading image
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const validateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files === null ? null : e.target.files[0];
    if ((file?.size as number) > 1048576) {
      alert("Maximum file size is 1mb");
    } else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  //Upload profile image
  const uploadProfileImage = async () => {
    return uploadImage(image, setUploading);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      return alert(`Upload your profile picture`);
    }
    const url = await uploadProfileImage();
    console.log(url);
  };

  return (
    <div className="flex w-full h-screen flex-col md:flex-row overflow-auto">
      <img
        src="https://images.unsplash.com/photo-1488998287214-1e668a8e0dc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        className="w-full h-1/2 md:h-screen md:w-3/5 lg:w-4/6 "
      />
      <div
        className={`flex flex-col w-full justify-center p-5 md:w-3/4 md:p-2 lg:w-2/6 lg:p-5 xl:p-7 2xl:p-10`}
      >
        <p className="text-center text-light-blue text-lg">SIGNUP TO CHATSP</p>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center p-2 flex-col space-y-1">
            {previewImage !== null ? (
              <img
                src={previewImage}
                className={`w-24 rounded-full h-24 border`}
              />
            ) : (
              <Person className="text-black text-[3em] bg-slate-200 rounded-full w-[1.5em] h-[1.5em] p-1" />
            )}
            <label htmlFor="image-upload" className="">
              <p className="border-2 p-1 px-2 rounded-md font-medium opacity-70 cursor-pointer ">
                UPLOAD YOUR PROFILE IMAGE
              </p>
            </label>
            <input
              type="file"
              id="image-upload"
              hidden
              accept="image/png, image/jpeg"
              onChange={validateImage}
            />
          </div>
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
                autoComplete={"false"}
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
  );
};
export default Signup;
