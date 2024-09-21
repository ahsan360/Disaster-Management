"use client";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { s } from "../notification/page";
import BarChart from "../Component/BarChart";
import { useRouter, useSearchParams } from "next/navigation";
const DonationForm = () => {
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const searchParams = useSearchParams();
  const crisis_id = searchParams.get("crisis_id");
  const onFinish = async (values: any) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      async onOk() {
        console.log("OK");
        const res = await axios.post(
          "http://127.0.0.1:8000/server/donate/",
          {
            ...values,
            crisis_id: crisis_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          s("Donation Successful");
          window.location.reload();
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {crisis_id && (
        <>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mr-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Donate Money
            </h1>
            <Form
              form={form}
              name="donation_form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              {/* Username Field */}
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input className="p-2 border border-gray-300 rounded-md w-full" />
              </Form.Item>

              {/* Phone Number Field */}
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  className="p-2 border border-gray-300 rounded-md w-full"
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                />
              </Form.Item>

              {/* Amount Field */}
              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please input the donation amount!",
                  },
                ]}
              >
                <Input
                  className="p-2 border border-gray-300 rounded-md w-full"
                  type="number"
                  min="1"
                  placeholder="Enter amount in BDT"
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
                >
                  Donate
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}

      {/* Right Side - Bar Chart */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Donation Statistics
        </h2>
        <BarChart /> {/* Assuming BarChart is your component */}
      </div>
    </div>
  );
};

export default DonationForm;
