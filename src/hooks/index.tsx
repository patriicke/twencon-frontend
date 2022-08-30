import { useEffect, useState } from "react";
import api from "./../api";

//Upload image
export const uploadImage = async (image: any, setUploading: any) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "chatpresetimages");
  try {
    setUploading(true);
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/dkpaiyjv5/image/upload",
      {
        method: "post",
        body: data
      }
    );
    const urlData = await res.json();
    setUploading(false);
    return urlData.url;
  } catch (error) {
    setUploading(false);
    console.log(error);
  }
};

// scroll
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPostion] = useState<number>(0);
  useEffect(() => {
    const updatePosition = () => {
      setScrollPostion(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
};
/* Create verification code */

export const useVerifyUserVerificationCode = async (
  data: {
    v_code: string;
    acc_token: string | null;
  },
  dispatch: any,
  navigate: any,
  userData: any,
  setLoading: any,
  setServerMsg: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/verification/create/verify", data);
    const response = request.data;
    dispatch(userData(response.user));
    navigate("/create/success");
    setLoading(false);
  } catch (error: any) {
    console.log(error);
    if (error.response.status == 403) setServerMsg(true);
    setLoading(false);
    return error;
  }
};

/* Resend create verification code */

export const useResendCreateVerificationCode = async (
  data: {
    v_reference: string | null;
  },
  setResend: (value: boolean) => void,
  setLoading: (value: boolean) => void
) => {
  try {
    setLoading(true);
    const request = await api.post("/verification/create/resend", data);
    const response = request.data;
    setResend(true);
    console.log(response);
    localStorage.setItem("v_reference", response.v_reference);
    setLoading(false);
    return response;
  } catch (error) {
    console.log(error);
    setLoading(false);
    return error;
  }
};

/* Get user data on home route*/

export const useUserData = async (
  navigate: any,
  dispatch: any,
  userDataAction: any
) => {
  try {
    const acc_token = localStorage.getItem("acc_token");
    if (acc_token == "undefined" || !acc_token) return navigate("/auth/login");
    const request = await api.post("/home", { acc_token });
    const response = request.data;
    dispatch(userDataAction(response.foundUser));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
