import React from "react";

const Logo = ({ className = "" }) => (
  <svg className={`w-8 h-8 ${className}`} viewBox="0 0 256 256">
    <path
      fill="currentColor"
      d="M224 74h-18V64a22 22 0 0 0-22-22H40a22 22 0 0 0-22 22v96a22 22 0 0 0 22 22h114v10a22 22 0 0 0 22 22h48a22 22 0 0 0 22-22V96a22 22 0 0 0-22-22M40 170a10 10 0 0 1-10-10V64a10 10 0 0 1 10-10h144a10 10 0 0 1 10 10v10h-18a22 22 0 0 0-22 22v74Zm194 22a10 10 0 0 1-10 10h-48a10 10 0 0 1-10-10V96a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10Zm-100 16a6 6 0 0 1-6 6H88a6 6 0 0 1 0-12h40a6 6 0 0 1 6 6m80-96a6 6 0 0 1-6 6h-16a6 6 0 0 1 0-12h16a6 6 0 0 1 6 6"
    ></path>
  </svg>
);

export default Logo;
