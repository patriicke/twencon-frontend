import { Link } from "@mui/material";
import React from "react";

const links: {
  href: string;
  name: string;
}[] = [
  {
    href: "/",
    name: "Home"
  },
  {
    href: "/chat",
    name: "Chat"
  },
  {
    href: "/auth/login",
    name: "Login"
  },
  {
    href: "/auth/signup",
    name: "Signup"
  }
];

const Navigation: React.FC = () => {
  return (
    <div className="bg-blue-300 w-full h-16 flex items-center justify-center space-x-2 shadow-md">
      {links.map((data: { href: string; name: string }, index) => {
        return (
          <Link href={data.href} key={index}>
            {data.name}
          </Link>
        );
      })}
    </div>
  );
};
export default Navigation;
