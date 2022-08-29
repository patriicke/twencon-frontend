import React, { useEffect, useState } from "react";
import Pages from "./pages";
import Loading from "./assets/loading/loading.gif";
import Logo from "./assets/logo/twencon.svg";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
    return window.removeEventListener("load", () => {});
  });
  return (
    <>
      <div
        className={`w-full h-screen flex items-center justify-center static z-50 ${
          loading ? "" : "hidden"
        }`}
      >
        <div>
          <img src={Loading} alt="Loading..." className="w-10" />
        </div>
        <div className="absolute bottom-12">
          <img src={Logo} alt="Loading..." className="w-36" />
        </div>
      </div>
      <div className={`${loading ? "hidden" : ""}`}>
        <Pages />
      </div>
    </>
  );
};

export default App;
