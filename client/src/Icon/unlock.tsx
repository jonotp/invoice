import React from "react";
import IconProps from "./icon.interface";

const IconUnlock = ({
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
      strokeWidth={`${strokeWidth ? strokeWidth : "1"}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
    </svg>
  );
};

export default IconUnlock;
