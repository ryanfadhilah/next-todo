"use client";
import React, { useTransition } from "react";

import {
  PiCheckLight,
  PiHourglassLowLight,
  PiTrashLight,
} from "react-icons/pi";

type ButtonProps = {
  className: string;
  buttonType: string;
  todoId: string;
  buttonAction: (todoId: string) => Promise<void>;
};

export default function Button({
  className,
  buttonType,
  buttonAction,
  todoId,
}: ButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        className={`px-5 hover:text-Ivory transition-all ease-in-out duration-300
    ${className}`}
        disabled={isPending}
        onClick={() => {
          startTransition(async () => await buttonAction(todoId));
          // buttonAction(todoId);
        }}
      >
        {isPending ? (
          <PiHourglassLowLight className=" animate-spin" />
        ) : buttonType === "update" ? (
          <PiCheckLight />
        ) : (
          <PiTrashLight />
        )}
      </button>
    </>
  );
}
