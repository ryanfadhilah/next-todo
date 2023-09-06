"use client";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { PiHourglassLowLight } from "react-icons/pi";

type AddTodoButtonProps = {
  className?: string;
} & React.ComponentProps<"button">;

export default function TodoCategory({ className }: AddTodoButtonProps) {
  return (
    <>
      <ul className="grid w-full grid-cols-3">
        <li>
          <input
            type="radio"
            id="Urgent"
            name="category"
            value="Urgent"
            className="hidden peer"
            required
          />
          <label
            htmlFor="Urgent"
            className="inline-flex items-center justify-between w-full md:px-5 py-5 cursor-pointer
            text-gray-500 border border-black
            peer-checked:text-Ivory peer-checked:bg-red-500
            hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full ">Urgent</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="Important"
            name="category"
            value="Important"
            className="hidden peer"
          />
          <label
            htmlFor="Important"
            className="inline-flex items-center justify-between w-full md:px-5 py-5 cursor-pointer
            text-gray-500 border-black border-y-1
            peer-checked:text-Ivory peer-checked:bg-amber-500
            hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full">Important</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="Others"
            name="category"
            value="Others"
            className="hidden peer"
          />
          <label
            htmlFor="Others"
            className="inline-flex items-center justify-between w-full md:px-5 py-5 cursor-pointer
            text-gray-500 border border-black
            peer-checked:text-Ivory peer-checked:bg-teal-500
            hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full">Others</div>
            </div>
          </label>
        </li>
      </ul>
    </>
  );
}
