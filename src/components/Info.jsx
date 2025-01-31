import React from "react";

export default function Info({ title, description, styles }) {
  return (
    <div className="flex flex-row items-center justify-start gap-10 w-full">
      <p className={`text-2xl text-blue-200 `}>{title}:</p>
      <p className={`text-xl  description ${styles}`}>{description}</p>
    </div>
  );
}
