import React from "react";
import { FaListCheck } from "react-icons/fa6";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-row gap-4 py-8 mt-4 lg:justify-start lg:ml-28 xl:ml-24 2xl:mx-40 justify-center font-semibold">
        <div className="text-4xl pt-1">
          <FaListCheck />
        </div>
        <h1 className="text-4xl font-playwrite">TASKER</h1>
      </div>
    </>
  );
}
