import React from "react";
import Pages from "./pages";
const App: React.FC = () => {
  return (
    <>
      <div className={`${false ? "hidden" : ""}`}>
        <Pages />
      </div>
    </>
  );
};

export default App;
