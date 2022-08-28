import React from "react";
import { Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Language } from "@mui/icons-material";

const Footer: React.FC = () => {
  const userNavs = [
    {
      link: "https://www.facebook.com/profile.php?id=100076022093184",
      icon: <FacebookIcon className="text-blue-500 md:text-[2em]" />
    },
    {
      link: "https://twitter.com/patriicke",
      icon: <TwitterIcon className="text-blue-500 md:text-[2em]" />
    },
    {
      link: "https://github.com/patriicke",
      icon: <GitHubIcon className="md:text-[2em]" />
    },
    {
      link: "https://www.linkedin.com/in/ndayambaje-patrick-90737022b/",
      icon: <LinkedInIcon className="text-blue-500 md:text-[2em]" />
    },
    {
      link: "https://www.instagram.com/_patriicke/",
      icon: <InstagramIcon className="text-red-500 md:text-[2em]" />
    }
  ];
  const footerContent: { title: string; data: string[] }[] = [
    {
      title: "Overview",
      data: ["About", "Contacts", "Terms of Use", "Privacy Policy"]
    },
    {
      title: "Community Center",
      data: ["Support team", "Community Center", "Help"]
    },
    {
      title: "Company",
      data: ["About", "Jobs", "Branding", "Newsroom"]
    },
    {
      title: "Resources",
      data: ["College", "Support", "Safety", "Blog", "Feedback"]
    },
    {
      title: "Policies",
      data: [
        "Terms",
        "Privacy",
        "Cookie settings",
        "Guidlines",
        "Licence",
        "Moderation"
      ]
    }
  ];
  return (
    <div className="min-h-[20em] flex flex-col justify-center mt-5 border-t-2 space-y-3 pt-5">
      <div className="flex space-x-4 justify-evenly">
        {footerContent.map((data, index) => {
          return (
            <div key={index}>
              <h1 className="font-medium">{data.title}</h1>
              <div className="flex flex-col">
                {data.data.map((data, index) => {
                  return (
                    <Link
                      key={index}
                      underline={"hover"}
                      className="cursor-pointer"
                      href="#"
                    >
                      {data}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div>
          <h1 className="font-medium">Contact US</h1>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <p>Call:</p>
              <Link
                underline={"hover"}
                className="cursor-pointer"
                href="tel:250790603658"
                target={"_blank"}
              >
                +250 79 060 3658
              </Link>
            </div>
            <div className="flex space-x-1">
              <p>Email:</p>
              <Link
                underline={"hover"}
                className="cursor-pointer"
                href="mailto:250790603658"
              >
                patrickndayambaje4@gmail
              </Link>
            </div>
            <div className="flex space-x-1">
              <p>Skypee:</p>
              <Link
                underline={"hover"}
                className="cursor-pointer"
                href="mailto:250790603658"
              >
                Patrick NDAYAMBAJE
              </Link>
            </div>
          </div>
          <div className="mt-5 flex space-x-1 items-center">
            <h1 className="font-medium">Languge</h1>
            <Language />
            <p className="opacity-60 border border-gray-500 p-1 px-2 rounded-md">
              en-US
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Link>FOLLOW US ON:</Link>
        <div className="flex space-x-3 p-2">
          {userNavs.map((data, index) => {
            return (
              <a href={data.link} target="_blank" key={index}>
                {data.icon}
              </a>
            );
          })}
        </div>
      </div>
      <div className="p-2 flex items-center justify-center">
        &copy;2021-{new Date().getFullYear()} All rights are reserved
      </div>
    </div>
  );
};
export default Footer;
