import React from "react";
import Navigation from "../../components/Navigation";
const Home: React.FC = () => {
  return (
    <div className="w-full h-screen bg-red-300">
      <Navigation data={{ href: "auth/signup", title: "GET STARTED" }} />
      <div>Home</div>
    </div>
  );
};

export default Home;
