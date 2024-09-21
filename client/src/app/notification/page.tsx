"use client";
import React from "react";
import { notification } from "antd";
export const s = (msg: string, des: string = "", duration: number = 8) => {
  if (!msg || msg == "") return;
  notification.success({
    message: msg,
    description: des,
    duration,
  });
};
