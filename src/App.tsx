import React, { useEffect, useState } from "react";
import Pages from "./pages";
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.onload = () => {
      setLoading(false);
      document.querySelector(".loading-container")?.classList.add("hidden");
    };
  }, []);
  return (
    <>
      <div className={`${loading ? "hidden" : ""}`}>
        <Pages />
      </div>
    </>
  );
};

export default App;
