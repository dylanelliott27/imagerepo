import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { userContext } from "./App.js";

function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedin, setLoggedIn] = useState();
  const { login, loggedIn } = useContext(userContext);
  function registerRequest(e) {
    fetch(`${process.env.REACT_APP_URL}/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        login(data.username, null, true, data.money);
        setLoggedIn(true);
      })
      .catch((_) => alert("issue registering"));
  }

  if (loggedin || loggedIn) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col span={5}>
        <h1>Register</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={registerRequest}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
