import React from "react";
import { Link } from "@mui/material";
const PageNotFound: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col space-y-2 ">
      <p className="text-red-500 text-2xl">404 Page Not Found!</p>
      <Link href="/">Go back to home</Link>
    </div>
  );
};
export default PageNotFound;
