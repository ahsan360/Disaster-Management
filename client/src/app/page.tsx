"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [res, setRes] = useState("");
  const handleClick = async () => {
    const s = await axios.get("http://127.0.0.1:8000/server/dashboard/");
    setRes(s.data);
    console.log("🚀 ~ handleClick ~ res:", s);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleClick()}
        >
          clicke
        </button>
        {/* {res} */}
      </main>
    </div>
  );
}
