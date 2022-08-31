import axios from "axios";
import backend from "../service/url";
const instance = axios.create({
  baseURL: backend
});

export default instance;
