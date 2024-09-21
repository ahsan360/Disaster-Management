"use client";
import React, { use, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({});
  const getChartData = async (data) => {
    const chartData = await axios.get(
      "http://127.0.0.1:8000/server/get_chart_data/"
    );
    console.log("🚀 ~ getChartData ~ chartData:", chartData);
    setChartData(chartData.data);
  };
  useEffect(() => {
    getChartData();
  }, []);
  const data = {
    labels: ["Graph"],
    datasets: [
      {
        label: "Donations",
        data: [Number(chartData?.total_donation)],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: [Number(chartData?.total_expense)],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Donations and Expenses by Category",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
