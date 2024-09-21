"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";

const CrisisComponent = () => {
  const [crises, setCrises] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();
  const fetchCrises = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/server/get_crisis/"
    );
    console.log("🚀 ~ fetchCrises ~ response:", response);
    setCrises(response.data);
  };

  useEffect(() => {
    fetchCrises();
  }, []);

  const handleSubmit = async (values) => {
    await axios.post("http://127.0.0.1:8000/server/crisis/", values);
    form.resetFields(); // Reset form fields
    fetchCrises(); // Refresh the crisis list
  };

  return (
    <div className="flex flex-col md:flex-row p-6 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-md">
      {/* Left Section */}
      <div className="md:w-1/2 p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Crisis
        </h1>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="Crisis Name"
            rules={[
              { required: true, message: "Please input the crisis name!" },
            ]}
          >
            <Input placeholder="Crisis Name" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input placeholder="Location" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Input placeholder="Status" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Add Crisis
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-4">Current Crises:</h2>
        <ul className="space-y-4">
          {crises.map((crisis) => (
            <li
              key={crisis.id}
              className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-sm bg-white"
            >
              <div>
                <strong className="text-lg">{crisis.name}</strong>
                <p className="text-gray-600">Location: {crisis.location}</p>
                <p className="text-gray-600">Status: {crisis.status}</p>
              </div>
              <Button
                type="primary"
                shape="round"
                disabled={crisis.status !== "ACTIVE"}
                size="large"
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => {
                  router.push(`/donation?crisis_id=${crisis.id}`);
                }}
              >
                Donate
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrisisComponent;
