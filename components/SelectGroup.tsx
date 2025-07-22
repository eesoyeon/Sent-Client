import SelectDropdownItem from "@/components/SelectDropdownItem";
import SelectRow from "@/components/SelectRow";
import { useClickOutside } from "@/hooks/useClickOutside";
import {
  getDropdownItemStyle,
  getSelectItemStyle,
} from "@/utils/getTodoFormItemStyle";
import { useRef } from "react";

export interface SelectOption {
  id: number;
  label: string;
  value: string | number;
  onSelect?: (value: string) => void;
  icon?: React.ReactNode;
  dropdownOptions: {
    label: string;
    value: string | null;
    icon?: React.ReactNode;
  }[];
}

interface SelectGroupProps {
  options: SelectOption[];
  openSelectId: number | null;
  onToggle: (id: number | null) => void;
}

const SelectGroup = ({ options, openSelectId, onToggle }: SelectGroupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: wrapperRef,
    callback: () => onToggle(null),
  });

  return (
    <div ref={wrapperRef}>
      {options.map((selectOption, optionIndex) => {
        const styleClasses = getSelectItemStyle(optionIndex, options.length);
        const isOpen = openSelectId === selectOption.id;

        return (
          <div key={selectOption.id} className="relative">
            <SelectRow
              label={selectOption.label}
              value={selectOption.value}
              icon={selectOption.icon}
              isOpen={isOpen}
              className={styleClasses}
              onClick={() => onToggle(isOpen ? null : selectOption.id)}
            />

            {isOpen && (
              <div className="absolute right-3 top-9 w-fit max-h-60 overflow-y-auto rounded-xl shadow-lg z-50 backdrop-blur-lg">
                {selectOption.dropdownOptions.map(
                  (dropdownItem, dropdownIndex) => {
                    const styleClasses = getDropdownItemStyle(
                      dropdownIndex,
                      selectOption.dropdownOptions.length
                    );

                    return (
                      <SelectDropdownItem
                        key={dropdownItem.label}
                        label={dropdownItem.label}
                        icon={dropdownItem.icon}
                        className={styleClasses}
                        onSelect={() => {
                          selectOption.onSelect?.(dropdownItem.label);
                          onToggle(null);
                        }}
                      />
                    );
                  }
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SelectGroup;
