import React, { useState } from "react";

export default function Pagination({ page, pages, setPage }) {
  const [leftDisabled, setLeftDisabled] = useState(false);
  const [rightDisabled, setRightDisabled] = useState(false);
  const pageDecrement = () => {
    if (page === 1) {
      setLeftDisabled(true);
    } else {
      setPage((prev) => prev - 1);
      setLeftDisabled(false);
    }
  };

  const pageIncrement = () => {
    if (page === pages) {
      setRightDisabled(true);
    } else {
      setPage((prev) => prev + 1);
      setRightDisabled(false);
    }
  };
  return (
    <div className="flex flex-row w-full justify-between text-white mt-10 items-center">
      <div
        onClick={pageDecrement}
        className={leftDisabled ? " cursor-not-allowed" : "cursor-pointer"}
      >
        <img src="../../public/left-button.png" alt="left arrow" />
      </div>
      <div>
        <p className="text-xl font-bold">
          {page} <span>/{pages}</span>
        </p>
      </div>
      <div
        onClick={pageIncrement}
        className={rightDisabled ? " cursor-not-allowed" : "cursor-pointer"}
      >
        <img src="../../public/right-button.png" alt="right arrow " />
      </div>
    </div>
  );
}
