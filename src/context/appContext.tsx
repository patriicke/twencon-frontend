import { io } from "socket.io-client";
import React from "react";

const SOCKET_URL: string = "http://localhost:5001";

//app context
export const appContext = React.createContext();
