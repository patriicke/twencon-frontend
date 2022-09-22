import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetPosts } from "../../hooks";
import Person from "./../../assets/person/person.png";
const UserAccount: React.FC = () => {
  const user = useSelector((state: any) => state?.user?.userData);
  const username = useParams();
  const [posts, setPosts] = useState<any>([]);
  const getPosts = async () => {
    const posts = await useGetPosts(setPosts);
    console.log(posts);
  };
  useEffect(() => {
    getPosts();
    console.log(username);
  }, []);
  return (
    <div className="lg:w-[80%] xl:w-[50%] m-auto h-full my-2">
      <div className="border h-[25em] w-full bg-gray-200 rounded-md flex flex-col">
        <div className="border rounded-full h-1/3 relative">
          {user?.profile == "icon" ? (
            <img
              src={Person}
              className="rounded-full absolute h-[10em] w-[10em] -bottom-10 left-2"
            />
          ) : (
            <img
              src={user?.profile}
              className="rounded-full absolute h-[10em] w-[10em] -bottom-10 left-2"
            />
          )}
          <div className="rounded-full absolute right-3 bottom-3 border border-gray-500 p-2 px-4 cursor-pointer opacity-80 font-semibold">
            Edit your profile
          </div>
        </div>
        <div className="h-2/3 bg-white p-2 pt-12">
          <div className="flex gap-2">
            <h1 className="font-semibold opacity-80 text-[1.3em]">
              {user?.fullname}
            </h1>
            <h1 className="font-normal opacity-80 text-[1.3em] text-blue-600">
              @{user?.username}
            </h1>
          </div>
          <div className="flex py-2 gap-3 text-[1.2em]">
            <div className="flex gap-2">
              <span>0</span>
              <span className="font-bold">followers</span>
            </div>
            <div className="flex gap-2">
              <span>0</span>
              <span className="font-bold">following</span>
            </div>
            <div className="flex gap-2">
              <span>
                {
                  (posts as any).filter((post: any) => {
                    return post?.owner?.email === user?.email;
                  }).length
                }
              </span>
              <span className="font-bold">posts</span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default UserAccount;
