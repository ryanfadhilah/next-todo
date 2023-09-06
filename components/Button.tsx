"use client";
import { TypeTodo } from "@/types";
import React, { MouseEvent } from "react";
import { PiCheckLight, PiTrashLight } from "react-icons/pi";

type ButtonProps = {
  className: string;
  buttonType: string;
  todoId: string;
  buttonAction: (todoId: string) => Promise<void>;
};

const Button = async ({
  className,
  buttonType,
  buttonAction,
  todoId,
}: ButtonProps) => {
  return (
    <button
      className={`px-5 hover:text-Ivory transition-all ease-in-out duration-300
    ${className}`}
      onClick={() => buttonAction(todoId)}
    >
      {buttonType === "update" ? <PiCheckLight /> : <PiTrashLight />}
    </button>
  );
};

export default Button;
