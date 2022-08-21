import React from "react";
import { Button } from "@mui/material";
import Navigation from "../../components/Navigation";
import Footer from "./../../components/footer";
const Home: React.FC = () => {
  document.title =
    "Welcome to Chatsp! This is where you will connect to everyone you want.";
  const navigations: { name: string; href: string }[] = [
    {
      name: "GET STARTED",
      href: "auth/signup"
    },
    {
      name: "LOGIN",
      href: "auth/login"
    }
  ];
  return (
    <div className="w-full min-h-screen">
      <Navigation data={{ href: "auth/signup", title: "GET STARTED" }} />
      <div className="w-full  dark:bg-gray-900 relative min-h-screen ">
        <div className="flex w-[100%]  flex-col  md:grid md:grid-cols-2 gap-2 p-5  shadow-sm lg:px-[10%]">
          <div className="text-[1.2em] font-medium max-w-sm dark:text-white md:text-[1.9em] 2xl:mt-[2em]">
            Take your team collaboration to the next level
          </div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt=""
            className="animate-image row-span-4 lg:w-full"
          />
          <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-xl">
            Save more time on productive instead wasting it on team management.
            Our all in one solution will provide a significant boost.
          </div>
          <div className="flex flex-col space-y-3 max-h-11 md:flex-row md:space-x-2 md:space-y-0 md:justify-center md:items-center lg:justify-start lg:mt-4 ">
            {navigations.map((data, index) => {
              return (
                <Button
                  key={index}
                  href={data.href}
                  variant="contained"
                  className="md:w-[15em] h-[3em] bg-light-blue"
                >
                  {data.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="w-full p-4 space-y-3 flex items-center flex-col md:flex shadow-sm  md:px-6 md:flex-row md:justify-evenly md:space-x-5">
          <img
            src="https://img.freepik.com/free-vector/chat-concept-illustration_114360-129.jpg?t=st=1656660382~exp=1656660982~hmac=5279c99f652668af0ce49e3dd6116148a1f39c3285989e86e5b4a4a2f76a02fb&w=826"
            alt=""
            className="animate-image md:max-w-[50%] lg:max-w-[27%]"
          />
          <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-lg">
            Save more time on productive instead wasting it on team management.
            Our all in one solution will provide a significant boost.
          </div>
        </div>
        <div className="w-full p-4 space-y-3 flex items-center flex-col md:flex md:flex-row md:justify-evenly md:space-x-5 ">
          <img
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHNvY2lhbCUyMG1lZGlhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="animate-image md:max-w-[50%] lg:max-w-[30%]"
          />
          <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-lg">
            Save more time on productive instead wasting it on team management.
            Our all in one solution will provide a significant boost.
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
