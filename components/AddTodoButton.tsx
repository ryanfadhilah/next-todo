"use client";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { PiHourglassLowLight } from "react-icons/pi";

type AddTodoButtonProps = {
  //   children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">;

export default function AddTodoButton({ className }: AddTodoButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        className={`mt-10 bg-transparent text-black border-1 border-black hover:bg-black hover:text-Ivory focus:bg-black focus:text-Ivory transition-all ease-in-out duration-300 py-5 px-4 text-center ${className}`}
        disabled={pending}
        type="submit"
      >
        {pending ? (
          <PiHourglassLowLight className=" animate-spin m-auto shrink-0 text-2xl" />
        ) : (
          <p>SUBMIT</p>
        )}
      </button>
    </>
  );
}
