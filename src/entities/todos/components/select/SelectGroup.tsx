import SelectDropdownItem from '@/entities/todos/components/select/SelectDropdownItem';
import SelectRow from '@/entities/todos/components/select/SelectRow';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { getDropdownItemStyle, getSelectItemStyle } from '@/entities/todos/utils/getFormItemStyle';
import { ReactNode, useRef } from 'react';

export interface SelectOptionWithDropdown {
  id: number | string;
  label: string;
  value: string | number | null;
  icon?: React.ReactNode;
  dropdownOptions: {
    label: string | number;
    value: string | number | null;
    icon?: React.ReactNode;
  }[];
  onSelect?: (value: string | number) => void;
  disabled?: boolean;
}

interface SelectOptionWithCustomContent {
  id: number | string;
  label: string;
  value: string | number | null;
  icon?: React.ReactNode;
  customContent: ReactNode;
  onSelect?: (value: string | number) => void;
  disabled?: boolean;
}

export type SelectOption = SelectOptionWithDropdown | SelectOptionWithCustomContent;

interface SelectGroupProps {
  options: SelectOption[];
  openSelectId: number | string | null;
  onToggle: (id: number | string | null) => void;
}

const SelectGroup = ({ options, openSelectId, onToggle }: SelectGroupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: wrapperRef,
    callback: () => onToggle(null),
  });

  return (
    <div>
      {options.map((selectOption, optionIndex) => {
        const { border, rounded } = getSelectItemStyle(optionIndex, options.length);
        const isOpen = openSelectId === selectOption.id;

        return (
          <div key={selectOption.id} className="relative">
            <SelectRow
              label={selectOption.label}
              value={selectOption.value}
              icon={selectOption.icon}
              disabled={selectOption.disabled}
              isOpen={isOpen}
              className={`${border} ${rounded}`}
              onClick={() => onToggle(isOpen ? null : selectOption.id)}
            />

            {isOpen && (
              <div
                ref={wrapperRef}
                className="absolute right-3 top-9 w-fit max-h-60 overflow-y-auto rounded-xl shadow-lg z-50 backdrop-blur-lg "
              >
                {'customContent' in selectOption ? (
                  <div className="p-2 rounded-xl border-t border-t-white/40 border-b border-b-white/40">
                    {selectOption.customContent}
                  </div>
                ) : (
                  selectOption.dropdownOptions?.map((dropdownItem, dropdownIndex) => {
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
                  })
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
