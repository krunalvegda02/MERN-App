import React, { useState, useEffect } from "react";
import {
  Avatar,
  ProfileVideos,
  ProfileTweets,
  ProfileFollowing,
  ProfilePlaylist,
  Loading,
  SubscribeBtn,
} from "../index";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

function MyProfileComponent({ username, isChannel }) {
  //for page menus
  const [pageState, setPageState] = useState(1);

  const [channeldata, setChanneldata] = useState(null);

  // console.log(Username);

  useEffect(() => {
    axios
      .get(`/api/v1/users/c/${username}`)
      .then((res) => {
        // console.log("Channeldata", res.data.data);
        setChanneldata(res.data.data);
      })
      .catch((err) => {
        message.error("Channel fetching error");
        console.error("API ERROR:", err);
      });
  }, []);

  if (!channeldata) {
    return <Loading />;
  }

  return (
    <div>
      {/* Header cover image */}
      <div className="h-[100px] bg-white">
        <img
          src={
            channeldata.coverImage ||
            "https://tse1.mm.bing.net/th?id=OIP.ExnS3_PBvo0jK-W75PxmEwHaEK&pid=Api&P=0&h=180"
          }
          alt="coverimage"
          className="object-cover h-36 w-full"
        />
      </div>

      {/* Profile Section */}
      <div className="flex justify-between p-3 ">
        <div className="flex text-left">
          <Avatar h={130} w={130} src={channeldata.avatar} />
          <div className="flex-col pt-11 pl-4">
            <p className="text-white text-3xl pb-1 font-semibold">
              {channeldata.fullname}
            </p>
            <p className="text-gray-300 text-sm pb-0.5">
              @{channeldata.username}
            </p>
            <div className="flex">
              <p className="text-gray-300 text-sm">
                {channeldata.subscriberCount} Subscribers
              </p>
              <p className="px-2 text-gray-300 text-sm">●</p>
              <p className="text-gray-300 text-sm">
                {channeldata.channelsSubscribedToCount} Subscribed
              </p>
            </div>
          </div>
        </div>
        {/*
          <div className="flex justify-center bg-violet-400 mt-12 mr-3 h-8  pb-1.5 px-2 rounded-lg hover:bg-violet-500 hover:border duration-300">
            <EditOutlined />
            <p className="pl-2 font-medium text-lg ">
              {isChannel ? "Subscribe" : "Edit"}
            </p>
          </div>
        </Link> */}
        {!isChannel ? (
          <Link to="/edit-profile">
            <div className="flex justify-center mt-12 mr-3  h-8 px-2 border bg-violet-400  hover:bg-violet-500 hover:border duration-300">
              <div>
                <EditOutlined className="text-lg pt-1.5 " />
              </div>
              <p className="pl-2 font-medium text-lg ">Edit</p>
            </div>
          </Link>
        ) : (
          <div className="flex justify-center mt-12 mr-3  h-8   bg-violet-400  hover:bg-violet-500 hover:border duration-300">
            <SubscribeBtn />
          </div>
        )}
      </div>

      {/* Menu Bar */}
      <div className="flex text-white justify-evenly border-b-2 border-gray-500 pb-2 mt-2 mr-3">
        {[
          { id: 1, label: "Videos" },
          { id: 2, label: "Playlist" },
          { id: 3, label: "Tweets" },
          { id: 4, label: "Following" },
        ].map((menu) => (
          <div
            key={menu.id}
            onClick={() => setPageState(menu.id)}
            className={`px-24 py-1  ${
              pageState === menu.id
                ? "bg-violet-400"
                : "hover:bg-violet-200 hover:text-black"
            } duration-100`}
          >
            <p
              className={`inline-block font-semibold text-base ${
                pageState === menu.id ? "text-black " : ""
              }`}
            >
              {menu.label}
            </p>
          </div>
        ))}
      </div>

      {/* Page Content */}
      <div className="mt-2 mr-3">
        {pageState === 1 && (
          <ProfileVideos isChannel={isChannel} channelId={channeldata._id} />
        )}
        {pageState === 2 && (
          <ProfilePlaylist isChannel={isChannel} channelId={channeldata._id} />
        )}
        {pageState === 3 && (
          <ProfileTweets isChannel={isChannel} channelId={channeldata._id} />
        )}
        {pageState === 4 && (
          <ProfileFollowing
            isChannel={isChannel}
            channelId={channeldata._id}
            username={username}
          />
        )}
      </div>
    </div>
  );
}

export default MyProfileComponent;
