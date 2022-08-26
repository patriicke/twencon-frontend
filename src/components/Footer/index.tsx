import { Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const userNavs = [
    {
      link: "https://www.facebook.com/profile.php?id=100076022093184",
      icon: <FacebookIcon className="text-blue-500 md:text-[2em]" />
    },
    {
      link: "https://twitter.com/patr_ndayambaje",
      icon: <TwitterIcon className="text-blue-500 md:text-[2em]" />
    },
    {
      link: "https://github.com/patrick-n4",
      icon: <GitHubIcon className="md:text-[2em]" />
    },
    {
      link: "https://www.linkedin.com/in/ndayambaje-patrick-90737022b/",
      icon: <LinkedInIcon className="text-blue-500 md:text-[2em]" />
    },
    {
      link: "https://www.instagram.com/patrickndayambaje1/",
      icon: <InstagramIcon className="text-red-500 md:text-[2em]" />
    }
  ];
  const overview = ["About", "Contacts", "Terms of Use", "Privacy Policy"];
  const community = ["Community center", "Support team", "Help"];
  return (
    <div className="h-72 md:flex md:flex-col md:justify-center md:h-52 md:items-center border overflow-hidden sm:absolute left-0 right-0 dark:bg-gray-900">
      <div className="flex h-[78%] space-x-1 p-1 dark:text-white md:w-full   ">
        <div className="w-1/2 h-full grid grid-cols-2 md:ml-10 lg:ml-52 ">
          <div className="text-[0.7rem] md:text-[0.8em]">
            <div className="font-bold">Overview</div>
            {overview.map((data, index) => {
              return <div key={index}>{data}</div>;
            })}
          </div>
          <div className="text-[0.7rem] md:text-[0.8em]">
            <div className="font-bold ">Community</div>
            {community.map((data, index) => {
              return <div key={index}>{data}</div>;
            })}
          </div>
          <div className="text-[0.7rem] md:text-[0.8em]">
            <div className="font-bold">Follow us</div>
            <div className="flex md:space-x-2">
              {userNavs.map((data, index) => {
                return (
                  <a href={data.link} target="_blank" key={index}>
                    {data.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full ">
          <div className="md:text-[1em]">
            <div className="font-bold text-[0.8em]">Contact Us</div>
            <div className="text-[0.7em]">Call: +250 78 626 7979</div>
            <div className="text-[0.7em] flex items-center sm:space-x-1 flex-wrap">
              <div className="0.7rem">Email:</div>
              <Button
                className="lowercase p-0 text-[0.7rem] md:text-[1em] text-light-blue"
                href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSGKnKzdQbfqSPBFngwZvTbDjKqMwGqtWPvHBKckCrdlDxhXHqJSHVGkjMBFQxNzmlwTDrxG"
                target={"_blank"}
              >
                patrickndayambaje4@gmail.com
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-[0.8rem] dark:text-white">
        &copy;2021-{new Date().getFullYear()} All rights are reserved
      </div>
    </div>
  );
};
export default Footer;
