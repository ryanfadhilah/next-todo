import React from "react";
import { PiHourglassLowLight } from "react-icons/pi";

const Loading = () => {
  return (
    <span className="flex justify-center mt-40 items-center m-auto">
      <PiHourglassLowLight className=" animate-spin text-3xl" />
    </span>
  );
};

export default Loading;
