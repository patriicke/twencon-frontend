import React, { useEffect, useState } from "react";
import tick from "./../../../assets/success/tick.png";
import Twencon from "./../../../assets/logo/twencon.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, useUserData } from "../../../hooks";
import { userDataAction } from "../../../features/user/userSlice";
import Loading from "./../../../assets/loading/loading.gif";
import Person from "./../../../assets/person/person.png";
const Success: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.user.userData);
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  useEffect(() => {
    let timer = setTimeout(() => {
      setShow((current) => !current);
    }, 5000);
    return () => clearTimeout(timer);
  }, [show]);
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
  }, []);
  const validateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file: any = e.target.files == null ? null : e.target.files[0];
    if ((file.size as number) > 2048576) {
      alert("Maximum file size should be atleast 2mb");
    } else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async () => {
    await uploadImage(image, setUploading, userData?.email);
    document.location.replace(document.location.origin);
  };
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      {/* {previewImage == null && (
        <div className="absolute bg-red-500 w-[20em] h-[20em] z-50"></div>
      )} */}
      <div className="bg-white shadow-lg w-[25em] h-[35em] border p-5 pt-10 flex flex-col space-y-3 relative">
        <div className="flex items-center justify-center absolute -top-10 z-50 left-[42%]">
          <img src={tick} className="w-20" />
        </div>
        <div className="flex items-center justify-center">
          <img src={Twencon} className="w-28" />
        </div>
        <div className="flex items-center justify-center pb-7 relative">
          <div className="border-2 border-opacity-70 rounded-full flex items-center justify-center">
            {previewImage === null ? (
              <img src={Person} className="w-16 h-16 rounded-full" />
            ) : (
              <img src={previewImage} className="w-20 h-20 rounded-full" />
            )}
          </div>
          <label
            className="absolute -bottom-2 text-[0.8em]"
            htmlFor="image-upload"
          >
            <p className="border-2 p-1 px-2 rounded-md font-medium opacity-70 cursor-pointer ">
              SELECT IMAGE
            </p>
            <input
              type="file"
              id="image-upload"
              hidden
              accept="image/png, image/jpeg"
              onChange={validateImage}
            />
          </label>
        </div>
        <h1 className="text-center text-md font-medium">
          {userData?.fullname}
        </h1>
        <div className="flex space-x-1 items-center justify-center">
          <h1 className="text-xl">Welcome to </h1>
          <img src={Twencon} className="w-24" />
          <p className="flex items-end justify-end text-2xl">!</p>
        </div>
        <div>
          <p className={`flex items-center justify-center text-center text-md`}>
            {show
              ? "You can now start posting videos and images and chat with your friends and family!"
              : "Your group management is no longer a problem now!"}
          </p>
        </div>
        {previewImage && (
          <>
            {uploading && (
              <div className="flex items-center justify-center text-light-blue flex-col">
                <p>Wait as image uploads!</p>
                <img src={Loading} className="w-8" />
              </div>
            )}
            <div className="py-2 flex items-center justify-center">
              <Button
                variant="contained"
                className="bg-light-blue m-auto"
                disabled={uploading}
                onClick={handleSubmit}
              >
                UPLOAD YOUR PROFILE IMAGE
              </Button>
            </div>
          </>
        )}
        <div className="py-1 flex items-center justify-center absolute bottom-8 w-full left-0">
          <Button
            variant="contained"
            className="bg-light-blue w-2/5"
            onClick={() => {
              document.location.replace(document.location.origin);
            }}
            disabled={uploading}
          >
            SKIP FOR NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
