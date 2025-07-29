import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface SettingHeaderProps {
  title: string;
  onClick: () => void;
}

const SettingHeader = ({ title, onClick }: SettingHeaderProps) => {
  return (
    <header className="flex items-center p-4 pl-0">
      <button onClick={onClick}>
        <ChevronLeft className="h-9 w-9" />
      </button>
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </header>
  );
};

export default SettingHeader;
