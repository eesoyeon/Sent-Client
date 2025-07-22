import { cn } from "@/lib/utils";

interface SelectDropdownItemProps {
  label: string;
  icon?: React.ReactNode;
  className: string;
  onSelect: () => void;
}

const SelectDropdownItem = ({
  label,
  icon,
  className,
  onSelect,
}: SelectDropdownItemProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "py-2 px-8 w-full text-sm font-medium text-left cursor-pointer hover:bg-white/10 flex items-center justify-between gap-8",
        className
      )}
    >
      <p className="w-24 text-gray-300">{label}</p>
      <div>{icon}</div>
    </button>
  );
};

export default SelectDropdownItem;
