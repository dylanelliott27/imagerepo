import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { userContext } from "./userContext.js";
import Menu from "antd/es/menu";

import MailOutlined from "@ant-design/icons/MailOutlined";
import AppstoreOutlined from "@ant-design/icons/AppstoreOutlined";

function Nav() {
  const { userInfo, logout } = useContext(userContext);

  function handleLogout() {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
  }
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<MailOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {!userInfo.username && (
        <Menu.Item key="login" icon={<AppstoreOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
      {!userInfo.username && (
        <Menu.Item key="register" icon={<AppstoreOutlined />}>
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}
      {userInfo.username && (
        <Menu.Item key="upload" icon={<AppstoreOutlined />}>
          <Link to="/upload">Upload</Link>
        </Menu.Item>
      )}
      {userInfo.username && (
        <Menu.Item key="myImages" icon={<AppstoreOutlined />}>
          <Link to="/myimages">My Images</Link>
        </Menu.Item>
      )}
      {userInfo.username && (
        <Menu.Item
          style={{ float: "right" }}
          key="user"
          icon={<AppstoreOutlined />}
        >
          {userInfo.username}
        </Menu.Item>
      )}
      {userInfo.username && (
        <Menu.Item
          style={{ float: "right" }}
          key="money"
          icon={<AppstoreOutlined />}
        >
          ${userInfo.money}
        </Menu.Item>
      )}
      {userInfo.username && (
        <Menu.Item
          onClick={handleLogout}
          style={{ float: "right" }}
          key="logout"
          icon={<AppstoreOutlined />}
        >
          Log out
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Nav;
