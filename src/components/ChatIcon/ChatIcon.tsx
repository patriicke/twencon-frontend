import React from "react";
import ChatImage from "./../../assets/chat/chat.png";

interface ChatIconProps {
  className?: string;
}
const ChatIcon: React.FC<ChatIconProps> = ({ className }) => {
  return (
    <div>
      <img src={ChatImage} alt="Chat Icon" className={className} />
    </div>
  );
};

export default ChatIcon;
