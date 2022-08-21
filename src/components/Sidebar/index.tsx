import React from "react";

const Sidebar: React.FC = () => {
  const rooms = ["first room", "second room", "third room"];
  return (
    <div className="w-1/5 bg-yellow-100">
      <h1>Available rooms</h1>
      <ul>
        {rooms.map((data, index) => {
          return <li key={index}>{data}</li>;
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
