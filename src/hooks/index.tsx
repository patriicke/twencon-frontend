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
