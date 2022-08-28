import React, { useState } from "react";
import { Button } from "@mui/material";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Logo from "./../../assets/logo/twencon.svg";
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
  const pageDescription: { description: string; url: string }[] = [
    {
      description:
        "Save more time on productive instead wasting it on team management.Our all in one solution will provide a significant boost.",
      url: "https://images.unsplash.com/photo-1626387753307-5a329fa44578?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
    },
    {
      description:
        "Save more time on productive instead wasting it on team management.Our all in one solution will provide a significant boost.",
      url: "https://images.unsplash.com/photo-1640244674671-f32e0f186e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=08"
    }
  ];
  return (
    <div className={`w-full min-h-screen`}>
      <Navigation data={{ href: "auth/signup", title: "GET STARTED" }} />
      <div className="w-full dark:bg-gray-900 relative min-h-screen ">
        <div className="flex w-[100%] flex-col md:grid md:grid-cols-2 gap-2 p-5 shadow-sm lg:px-[5%]">
          <div className="text-[1.2em] font-medium max-w-sm dark:text-white md:text-[1.4em] 2xl:mt-[1.6em]">
            Take your team collaboration to the next level. Project managament
            is made easy with
            <img src={Logo} className="w-1/2" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt=""
            className="animate-image row-span-4 lg:w-full rounded-md"
          />
          <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-xl">
            Save more time on productive instead wasting it on team management.
            Our all in one solution will provide a significant boost.
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
        {pageDescription.map((data, index) => {
          return (
            <div
              className="p-5 w-full flex flex-col md:flex-row justify-between items-center gap-5 lg:px-14 xl:px-20 2xl:px-24"
              key={index}
            >
              <img
                src={data.url}
                className="w-full rounded-md md:w-1/2 flex items-center justify-center"
              />
              <div className="w-full py-5 md:w-1/2 flex items-center justify-center">
                <p className="lg:w-[60%] text-[1.2em]">{data.description}</p>
              </div>
            </div>
          );
        })}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
