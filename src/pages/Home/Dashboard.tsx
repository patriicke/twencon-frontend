import React from "react";
import { Button } from "@mui/material";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import FirstImage from "/first.jpg";
import SecondImage from "/second.jpg";
import ThirdImage from "/third.jpg";
const Dashboard: React.FC = () => {
  document.title =
    "Welcome to Twencon! This is where you will connect to everyone you want.";
  const navigations: { name: string; href: string }[] = [
    {
      name: "GET STARTED",
      href: "/auth/signup"
    },
    {
      name: "LOGIN",
      href: "/auth/login"
    }
  ];
  const pageDescription: { description: string; url: any }[] = [
    {
      description:
        "Save more time on productive instead wasting it on team management.Our all in one solution will provide a significant boost.",
      url: SecondImage
    },
    {
      description:
        "Save more time on productive instead wasting it on team management.Our all in one solution will provide a significant boost.",
      url: ThirdImage
    }
  ];
  return (
    <div className={`w-full min-h-screen`}>
      <Navigation data={{ href: "auth/signup", title: "GET STARTED" }} />
      <div className="w-full dark:bg-gray-900 relative min-h-screen">
        <div className="flex w-[100%] flex-col md:grid md:grid-cols-2 gap-2 p-5 shadow-sm lg:px-[5%]">
          <div className="text-[1.1em] font-normal w-full md:max-w-md dark:text-white md:text-[1.2em] 2xl:pt-10">
            <p>
              All in one is now available! This is where you can chat with your
              friends and family members. But also project management is made
              simple with us, everyone in the group is given a task and when
              he/she finishes the work it is marked in the group and presented
              to everyone. This seems to be awesome!
            </p>
          </div>
          <img
            src={FirstImage}
            alt=""
            className="animate-image row-span-4 lg:w-full rounded-md"
          />
          <div className="text-[0.9em] text-gray-700 dark:text-white md:text-[1.2em] md:max-w-xl">
            You can create more than one group for free. You can post photos and
            videos and get feedback from your friends. Be the one to invite your
            friends and family members first!
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
              <div className="w-full py-5 md:w-1/2 flex items-center justify-center bg-white">
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

export default Dashboard;
