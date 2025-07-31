import { cn } from '@/shared/lib/utils';

interface SelectDropdownItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
  onSelect: (label: string) => void;
}

const SelectDropdownItem = ({
  label,
  value,
  icon,
  className,
  onSelect,
}: SelectDropdownItemProps) => {
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(value);
  };

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      className={cn(
        'py-2 px-8 w-full text-sm font-medium text-left cursor-pointer hover:bg-white/10 flex items-center justify-between gap-8',
        className,
      )}
    >
      <p className="w-24 text-gray-300">{label}</p>
      <div>{icon}</div>
    </button>
  );
};

export default SelectDropdownItem;
