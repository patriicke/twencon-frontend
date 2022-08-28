import React, { useState } from "react";
import { Button } from "@mui/material";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
const Home: React.FC = () => {
  document.title =
    "Welcome to Twencon! This is where you will connect to everyone you want.";
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
    <div>
      <div className={`w-full min-h-screen`}>
        <Navigation data={{ href: "auth/signup", title: "GET STARTED" }} />
        <div className="w-full dark:bg-gray-900 relative min-h-screen ">
          <div className="flex w-[100%] flex-col md:grid md:grid-cols-2 gap-2 p-5 shadow-sm lg:px-[5%]">
            <div className="text-[1.2em] font-medium max-w-sm dark:text-white md:text-[1.9em] 2xl:mt-[2em]">
              Take your team collaboration to the next level
            </div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              alt=""
              className="animate-image row-span-4 lg:w-full"
            />
            <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-xl">
              Save more time on productive instead wasting it on team
              management. Our all in one solution will provide a significant
              boost.
            </div>
            <div className="flex flex-col space-y-3 min-h-11 md:flex-row md:space-x-2 md:space-y-0 md:justify-center md:items-center lg:justify-start lg:mt-4 ">
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
              src="https://images.unsplash.com/photo-1626387753307-5a329fa44578?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
              alt=""
              className="animate-image md:max-w-[50%] lg:max-w-[40%] rounded-md"
            />
            <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-lg">
              Save more time on productive instead wasting it on team
              management. Our all in one solution will provide a significant
              boost.
            </div>
          </div>
          <div className="w-full p-4 space-y-3 flex items-center flex-col md:flex md:flex-row md:justify-evenly md:space-x-5 ">
            <img
              src="https://images.unsplash.com/photo-1640244674671-f32e0f186e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              className="animate-image md:max-w-[50%] lg:max-w-[40%] rounded-md"
            />
            <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-lg">
              Save more time on productive instead wasting it on team
              management. Our all in one solution will provide a significant
              boost.
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
