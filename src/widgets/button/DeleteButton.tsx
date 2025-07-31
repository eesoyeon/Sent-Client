import React from "react";

interface DeleteButtonProps {
  title: string;
  onClick: () => void;
  className: string;
}

const DeleteButton = ({ title, onClick, className }: DeleteButtonProps) => {
  return (
    <button
      className={`px-4 py-3 rounded-xl w-full ${className}`}
      onClick={onClick}
    >
      <p className="text-center text-sm font-medium text-[#FF453A]">{title}</p>
    </button>
  );
};

export default DeleteButton;
