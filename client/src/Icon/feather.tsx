import React from "react";
import IconProps from "./icon.interface";

const IconFeather = ({
  width,
  height,
  fill,
  strokeColor,
  strokeWidth,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width ? width : "32"}`}
      height={`${height ? height : "32"}`}
      viewBox="0 0 24 24"
      fill={`${fill ? fill : "none"}`}
      stroke={`${strokeColor ? strokeColor : "currentColor"}`}
      strokeWidth={`${strokeWidth ? strokeWidth : "2"}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
  );
};

export default IconFeather;
