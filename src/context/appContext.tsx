import { io } from "socket.io-client";
import { createContext } from "react";
import backend from "../service/url";
const SOCKET_URL: string = backend;

export const socket = io(SOCKET_URL);
//app context
export const AppContext = createContext({});
