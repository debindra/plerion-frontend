import React from "react";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="bg-white rounded-lg p-6 z-50 w-5/12">{children}</div>
    </div>
  );
};

export default Modal;
