import api from "./../api";

//signup custom hook
/*
const handleSubmit = async (e) => {
  e.preventDefault();
  if (loginInfo.email == "" || !loginInfo.email.includes("@gmail.com")) {
    setLoading(false);
    return setIputError({
      password: false,
      email: true
    });
  }
  if (loginInfo.password == "") {
    setLoading(false);
    return setIputError({
      password: true,
      email: false
    });
  }
  const response = await api.post("/login", { ...loginInfo });
  console.log(response.data);
  if (response.data == "Not Found") {
    setLoading(false);
    return setIputError({
      password: false,
      email: true
    });
  }
  if (response.data == "Incorrect Data") {
    setLoading(false);
    return setIputError({
      password: true,
      email: false
    });
  }
  setLoading(false);
  localStorage.setItem("refresh", response.data.refresh);
  localStorage.setItem("token", response.data.token);
  return navigate("/");
};*/

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
