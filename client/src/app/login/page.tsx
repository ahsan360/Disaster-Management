"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import { s } from "../notification/page";
import axios from "axios";
import { useRouter } from "next/navigation";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values)
    const res = await axios.post(
      "http://127.0.0.1:8000/server/signin/",
      {
        username: values.username,
        password: values.password,
      }
    );
    if (res) 
    {
      s("Login Successful");
      router.push("/");
    }
    form.resetFields();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Headline */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h1>

        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Username" name="username">
            <Input className="border-gray-300 rounded-md shadow-sm" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="border-gray-300 rounded-md shadow-sm" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
