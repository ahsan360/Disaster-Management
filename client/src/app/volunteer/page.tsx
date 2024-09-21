"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input } from "antd";
import useAuthUser from "../useAuthuser";
import { s } from "../notification/page";

const VolunteerComponent = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const { user } = useAuthUser();
  const [form] = Form.useForm();
  // Fetch volunteers from the API
  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/server/get_volunteer/"
      );
      setVolunteers(response.data);
    } catch (error) {
      console.error("Failed to fetch volunteers:", error);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Handle volunteer approval
  const handleApprove = (volunteer) => {
    console.log("Approved volunteer:", volunteer);
    // API call to approve volunteer could go here
  };

  // Show the modal to assign a task to the volunteer
  const showAssignTaskModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalVisible(true);
  };

  // Handle task assignment to the selected volunteer
  const handleAssignTask = async (values) => {
    console.log("🚀 ~ handleAssignTask ~ values:", values);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/server/update_task/`,
        {
          ...values,
          user_id: selectedVolunteer.id,
        }
      );
      setIsModalVisible(false);
      s("Task assigned successfully");
      form.resetFields();
      fetchVolunteers(); // Refresh the volunteer list
    } catch (error) {
      console.error("Failed to assign task:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Volunteer Management
      </h1>

      {/* Volunteers Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Table dataSource={volunteers} rowKey="id" pagination={false}>
          <Table.Column title="Name" dataIndex="username" />
          <Table.Column title="Email" dataIndex="email" />
          <Table.Column title="Age" dataIndex="age" />
          <Table.Column title="Phone Number" dataIndex="phon_number" />
          <Table.Column title="Current Task" dataIndex="task" />
          {user?.admin && (
            <Table.Column
              title="Action"
              render={(text, volunteer) => (
                <div className="space-x-2">
                  <Button
                    type="default"
                    onClick={() => showAssignTaskModal(volunteer)}
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Assign Task
                  </Button>
                </div>
              )}
            />
          )}
        </Table>
      </div>

      {/* Modal for Assigning Task */}
      <Modal
        title={`Assign Task to ${selectedVolunteer?.username || "Volunteer"}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="rounded-lg"
      >
        <Form layout="vertical" onFinish={handleAssignTask} form={form}>
          <Form.Item
            label="Task"
            name="task"
            required
            rules={[{ required: true, message: "Please enter a task" }]}
          >
            <Input
              placeholder="Enter task for the volunteer"
              className="border-gray-300 rounded-lg"
            />
          </Form.Item>
          <Form.Item
            label="Expense"
            name="expense"
            required
            rules={[{ required: true, message: "Please enter a expense" }]}
          >
            <Input
              placeholder="Enter Expense"
              className="border-gray-300 rounded-lg"
            />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            required
            rules={[{ required: true, message: "Please enter a location" }]}
          >
            <Input
              placeholder="Enter Location"
              className="border-gray-300 rounded-lg"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
            >
              Assign Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VolunteerComponent;
