import { io } from "socket.io-client";
import { createContext } from "react";
const SOCKET_URL: string = "http://localhost:5001";

export const socket = io(SOCKET_URL);
//app context
export const AppContext = createContext({});
