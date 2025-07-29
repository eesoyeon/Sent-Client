import SelectDropdownItem from '@/features/todos/components/Select/SelectDropdownItem';
import SelectRow from '@/features/todos/components/Select/SelectRow';
import { useClickOutside } from '@/hooks/useClickOutside';
import { getDropdownItemStyle, getSelectItemStyle } from '@/features/todos/utils/getFormItemStyle';
import { useRef } from 'react';

export interface SelectOption {
  id: number;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  dropdownOptions: {
    label: string;
    value: string | null;
    icon?: React.ReactNode;
  }[];
  onSelect?: (value: string) => void;
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
        const { border, rounded } = getSelectItemStyle(optionIndex, options.length);
        const isOpen = openSelectId === selectOption.id;

        return (
          <div key={selectOption.id} className="relative">
            <SelectRow
              label={selectOption.label}
              value={selectOption.value}
              icon={selectOption.icon}
              isOpen={isOpen}
              className={`${border} ${rounded}`}
              onClick={() => onToggle(isOpen ? null : selectOption.id)}
            />

            {isOpen && (
              <div className="absolute right-3 top-9 w-fit max-h-60 overflow-y-auto rounded-xl shadow-lg z-50 backdrop-blur-lg">
                {selectOption.dropdownOptions.map((dropdownItem, dropdownIndex) => {
                  const { border, rounded } = getDropdownItemStyle(
                    dropdownIndex,
                    selectOption.dropdownOptions.length,
                  );

                  return (
                    <SelectDropdownItem
                      key={dropdownItem.value}
                      label={dropdownItem.label}
                      value={dropdownItem.value ?? ''}
                      icon={dropdownItem.icon}
                      className={`${border} ${rounded}`}
                      onSelect={value => {
                        selectOption.onSelect?.(value);
                        onToggle(null);
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SelectGroup;
