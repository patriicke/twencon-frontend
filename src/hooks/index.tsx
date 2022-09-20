import { useEffect, useState } from "react";
import api from "./../api";
/*Upload image */
export const uploadImage = async (
  image: any,
  setUploading: any,
  email: string
) => {
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
    const request = await api.post("/auth/upload", {
      profile: urlData.url,
      email
    });
    const response = request.data;
    return response;
  } catch (error) {
    console.log(error);
  } finally {
    setUploading(false);
  }
};
/*Upload many images */
export const uploadManyImages = async (images: any, setLoading: any) => {
  try {
    let imageUrls: string[] = [];
    images.map(async (image: any) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "chatpresetimages");
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dkpaiyjv5/image/upload",
        {
          method: "post",
          body: data
        }
      );
      let urlData = await res.json();
      imageUrls.push(urlData.secure_url);
    });
    console.log(imageUrls);
    return imageUrls;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
/* scroll */
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
    localStorage.setItem("v_reference", response.v_reference);
    setLoading(false);
    return response;
  } catch (error) {
    console.log(error);
    setLoading(false);
    return error;
  }
};
/* Get user data on home route */
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
  } catch (error) {
    console.log(error);
  }
};
/* Reset password */
export const restPassword = async () => {
  const request = await api.post("/reset/verify");
};
/* Reset all notifications from a room */
export const resetNotificationsFromDatabase = async (email: any, room: any) => {
  const request = await api.post("/notifications/reset", { email, room });
};
/* This is all about the posts */
export const useGetPosts = async (setPosts: any, setAllPostsObject?: any) => {
  try {
    const request = await api.get("/post");
    const response = request.data;
    setPosts(response);
    response.map((data1: any, index1: number) => {
      if (data1.post.images.length < 1) {
        return setAllPostsObject((current: any) => {
          return {
            ...current,
            [index1]: {
              postTotalImages: 0,
              postCurrentImage: 0
            }
          };
        });
      } else {
        return setAllPostsObject((current: any) => {
          return {
            ...current,
            [index1]: {
              postTotalImages: data1.post.images.length,
              postCurrentImage: 0
            }
          };
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
/* Use notify me */
export const useNotifyMe = (
  header: any,
  body: any,
  icon: any,
  playNotificationSound: any
) => {
  if (!window.Notification) {
    console.log("Browser does not support notifications.");
  } else {
    if (Notification.permission === "granted") {
      var notify = new Notification(`Twencon! ${header}`, {
        body,
        icon
      });

      playNotificationSound();
    } else {
      Notification.requestPermission()
        .then(function (p) {
          if (p === "granted") {
            var notify = new Notification(`Twencon! ${header}`, {
              body,
              icon
            });
            playNotificationSound();
          } else {
            console.log("User blocked notifications.");
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  }
};
