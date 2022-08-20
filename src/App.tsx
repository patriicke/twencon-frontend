import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

const apiKey = "v86gjjch5ksv";
const client = StreamChat.getInstance(apiKey);
const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-red-300">
      <Chat client={client} theme={"team light"}></Chat>
    </div>
  );
};

export default App;
