import React from "react";

export default function CustomLoading({ loadingMessage }) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div
        className="custom-loading-overlay"
        style={{
          height: 150,
          width: 150,
          background:
            "url(https://www.ag-grid.com/images/ag-grid-loading-spinner.svg) center / contain no-repeat",
          margin: "0 auto",
        }}
      ></div>
      <div className="text-2xl" aria-live="polite" aria-atomic="true">
        {loadingMessage}
      </div>
    </div>
  );
}
