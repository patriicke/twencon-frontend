import React, { useEffect, useState } from "react";
import Pages from "./pages";
import Loading from "./assets/loading/loading.gif";
import Logo from "./assets/logo/twencon.svg";

const App: React.FC = () => {
  const [loaded, setStatus] = useState<boolean>(false);

  document.onreadystatechange = () => {
    setStatus(document.readyState === "complete");
  };

  return (
    <>
      <div
        className={`w-full h-screen flex items-center justify-center static z-50 ${
          loaded ? "" : "hidden"
        }`}
      >
        <div>
          <img src={Loading} alt="Loading..." className="w-10" />
        </div>
        <div className="absolute bottom-12">
          <img src={Logo} alt="Loading..." className="w-36" />
        </div>
      </div>
      <div className={`${loaded ? "hidden" : ""}`}>
        <Pages />
      </div>
    </>
  );
};

export default App;
