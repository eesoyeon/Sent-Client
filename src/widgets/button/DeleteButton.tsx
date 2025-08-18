import React from 'react';

interface DeleteButtonProps {
  title: string;
  onClick?: (e: React.FormEvent) => void;
  backgroundColor: string;
}

const DeleteButton = ({ title, onClick, backgroundColor }: DeleteButtonProps) => {
  return (
    <button className={`px-4 py-3 rounded-xl w-full ${backgroundColor}`} onClick={onClick}>
      <p className="text-center text-sm font-medium text-[#FF453A]">{title}</p>
    </button>
  );
};

export default DeleteButton;
