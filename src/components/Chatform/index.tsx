import { InsertEmoticon, Send } from "@mui/icons-material";
import { Input } from "@mui/material";
import React from "react";
const Chatform: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="bg-white h-screen border shadow-lg flex flex-col w-full md:w-4/5 lg:w-3/5">
      <div className="h-[92%] w-full flex-shrink"></div>
      <form
        className="min-h-[8%] h-[5em] w-full flex items-center border p-1 lg:p-2 border-slate-300"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-full border border-gray-700 rounded-[2em] flex items-center">
          <div className="min-w-[2.5em] h-full sm:min-w-[0em] w-[7%] rounded-l-[2em] flex items-center justify-center">
            <div className="p-2 rounded-full h-[2.5em] w-[2.5em] flex items-center justify-center">
              <InsertEmoticon className="text-gray-700 text-[2em]" />
            </div>
          </div>
          <Input
            disableUnderline={true}
            autoFocus
            placeholder="Type a message"
            size="medium"
            className="w-[84%] h-full flex-shrink flex-grow"
          />
          <div className="w-[7%] sm:w-[10%] min-w-[4em] h-full rounded-r-[2em] flex items-center justify-evenly">
            <button
              className="p-2 rounded-full bg-light-blue h-[2.5em] w-[2.5em] flex items-center justify-center"
              type="submit"
            >
              <Send className="text-white" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chatform;

{
  /* <div className="w-full min-h-[3em] flex border border-gray-700 rounded-[2em]">
          <div className="h-[4em] w-[5em] flex items-center justify-center">
            <InsertEmoticon className="text-[2em]" />
          </div>
          <Input
            disableUnderline={true}
            autoFocus
            placeholder="Type a message"
            size="medium"
            className="w-[85%]"
          />
          <div className="h-full w-[30%] min-h-[4em] flex items-center justify-center space-x-2">
            {elements.map((data, index) => {
              return (
                <div
                  className="w-10 h-7 p-1 flex items-center justify-center lg:p-2 rounded-full bg-light-blue"
                  key={index}
                >
                  {data.component}
                </div>
              );
            })}
            <button className="p-2 rounded-full bg-light-blue" type="submit">
              <Send className="text-white" />
            </button>
          </div>
        </div> */
}
