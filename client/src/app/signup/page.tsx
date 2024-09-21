"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import axios from "axios";

const Signup = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    const res = await axios.post(
      "http://127.0.0.1:8000/server/signup/",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Headline */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>
        <Form
          form={form}
          name="signup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "The input is not a valid E-mail!" },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password1"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password2"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password1") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phon_number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Avprola Status"
            name="avprola_status"
            rules={[
              {message: "Please input your avprola status!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Crisis"
            name="crisis"
            rules={[{  message: "Please input the crisis!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{  message: "Please input your location!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Task"
            name="task"
            rules={[{  message: "Please input your task!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Active Status"
            name="active_status"
            rules={[
              {  message: "Please input your active status!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
