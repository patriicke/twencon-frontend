import { io } from "socket.io-client";
import { createContext } from "react";
import backend from "../service/backend";
const SOCKET_URL: string = backend;

export const chatSocket = io(SOCKET_URL);
export const socket = io(SOCKET_URL);
export const ChatContext = createContext({});
