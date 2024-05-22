import React, { useEffect, useState } from "react";
import "./login.css";
import {
  Card,
  Typography,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.authReducer.loading);
  // const error = useSelector((state) => state.authReducer.error);
  // const data = useSelector((state) => state.authReducer.data);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = () => {
    // dispatch(fetchLoginRequest({ email, password }));
  };
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="gradient-bg"></div> {/* Thêm lớp gradient-bg cho nền */}
      <Card
        bordered={false}
        style={{
          width: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title level={3}>Đăng nhập</Title>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 20,
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="email"
              className="h-12 text-base"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="h-12 text-base"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#4096ff] h-[50px] text-base"
              // loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
