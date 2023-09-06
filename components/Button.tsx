"use client";
import React, { useTransition } from "react";

import {
  PiCheckLight,
  PiHourglassLowLight,
  PiSmileyLight,
  PiSmileySadLight,
  PiTrashLight,
} from "react-icons/pi";

type ButtonProps = {
  className: string;
  buttonType: string;
  todoId: string;
  status?: boolean;
  buttonAction: (todoId: string) => Promise<void>;
};

export default function Button({
  className,
  buttonType,
  buttonAction,
  todoId,
  status,
}: ButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        className={`px-5 hover:text-Ivory transition-all ease-in-out duration-300
    ${className} relative group`}
        disabled={isPending}
        onClick={() => {
          startTransition(async () => await buttonAction(todoId));
          // buttonAction(todoId);
        }}
      >
        {isPending ? (
          <PiHourglassLowLight className=" animate-spin" />
        ) : status ? (
          <>
            <PiSmileySadLight className=" absolute opacity-0 group-hover:opacity-100" />
            <PiSmileyLight className="opacity-100 group-hover:opacity-0" />
          </>
        ) : buttonType === "update" ? (
          <PiCheckLight />
        ) : (
          <PiTrashLight />
        )}
      </button>
    </>
  );
}
