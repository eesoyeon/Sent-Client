import { cn } from '@/shared/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface SelectRowProps {
  label: string;
  value: string | number | null;
  icon?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  onClick?: () => void;
}

const SelectRow = ({ label, value, icon, isOpen = false, className, onClick }: SelectRowProps) => {
  const isEmptyValue = value === '없음';

  return (
    <div
      className={cn(
        'flex justify-between items-center px-4 py-3 bg-gray-800 w-full hover:bg-gray-700/60 relative',
        className,
      )}
      onClick={onClick}
    >
      <p className="flex-grow text-sm font-medium text-gray-300">{label}</p>

      <div className="flex items-center space-x-2">
        {icon && <span>{icon}</span>}
        <p className={`text-sm font-medium ${isEmptyValue ? 'text-gray-500' : 'text-gray-100'}`}>
          {value}
        </p>

        {isOpen ? (
          <ChevronDown className="text-gray-500 w-5 h-5" />
        ) : (
          <ChevronRight className="text-gray-500 w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default SelectRow;
