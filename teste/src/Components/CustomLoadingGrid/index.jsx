import React from "react";

export default function CustomLoading({ loadingMessage }) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div
        className="custom-loading-overlay"
        style={{
          height: 100,
          width: 100,
          background:
            "url(https://www.ag-grid.com/images/ag-grid-loading-spinner.svg) center / contain no-repeat",
          margin: "0 auto",
        }}
      ></div>
      <div aria-live="polite" aria-atomic="true">
        {loadingMessage}
      </div>
    </div>
  );
}
