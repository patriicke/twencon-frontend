import axios from "axios";

const instance = axios.create({
  baseURL: "https://twencon.herokuapp.com"
});

// baseURL: "http://localhost:5001"
export default instance;
