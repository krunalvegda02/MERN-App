import React from "react";
import { Link } from "react-router-dom";
import LeftNavbarItemBox from "../Components/LeftNavbarItemBox";
import {
  HomeOutlined,
  LikeOutlined,
  HistoryOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { Container } from "../index";

function Settings({ show, onBack }) {
  const settingItems = [
    {
      itemName: "Edit Profile",
      itemIcon: <HomeOutlined className="text-2xl px-2 text-white" />,
      link: "/edit-profile",
    },
    {
      itemName: "Change Password",
      itemIcon: <LikeOutlined className="text-2xl px-2 text-white" />,
      link: "/change-password",
    },
    {
      itemName: "LogPut !",
      itemIcon: <HistoryOutlined className="text-2xl px-2 text-white" />,
      link: "/logout",
    },
  ];

  return (
    <Container>
      <div
        className={`fixed top-[53.67px] left-0 h-full bg-gray-900 transition-transform duration-600 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "234px" }}
      >
        <div
          className="flex  items-start text-3xl mt-2 ml-2 text-violet-500 cursor-pointer"
          onClick={onBack}
        >
          <DoubleLeftOutlined />
          <p className="ml-1.5 font-bold text-xl">Back</p>
        </div>
        <div className="pt-2">
          {settingItems.map((item) => (
            <Link to={item.link} key={item.link}>
              <LeftNavbarItemBox
                key={item.itemName}
                name={item.itemName}
                icon={item.itemIcon}
              />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Settings;
