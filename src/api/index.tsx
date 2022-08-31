import axios from "axios";
import backend from "../service/backend";
const instance = axios.create({
  baseURL: backend
});

export default instance;
