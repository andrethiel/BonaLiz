import React from "react";

function Modal({ children }) {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[300]">
            <div className="bg-white w-96 px-6 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col gap-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
