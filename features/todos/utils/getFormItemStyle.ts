import clsx from 'clsx';

export const getDropdownItemStyle = (itemIndex: number, totalItems: number) => {
  const isOnlyItem = totalItems === 1;
  const isFirstItem = itemIndex === 0;
  const isLastItem = itemIndex === totalItems - 1;

  const rounded = clsx({
    'rounded-xl': isOnlyItem,
    'rounded-t-xl': isFirstItem && !isOnlyItem,
    'rounded-b-xl': isLastItem && !isOnlyItem,
  });

  const border = clsx({
    'border-t border-t-white/40 border-b border-b-gray-700': isFirstItem && !isOnlyItem,
    'border-b border-b-white/40': isLastItem && !isFirstItem,
    'border-b border-b-gray-700': !isFirstItem && !isLastItem && !isOnlyItem,
  });

  return { rounded, border };
};

export const getSelectItemStyle = (itemIndex: number, totalItems: number) => {
  const isOnlyItem = totalItems === 1;
  const isFirstItem = itemIndex === 0;
  const isLastItem = itemIndex === totalItems - 1;

  const rounded = clsx({
    'rounded-xl': isOnlyItem,
    'rounded-t-xl': isFirstItem && !isOnlyItem,
    'rounded-b-xl': isLastItem && !isOnlyItem,
  });

  const border = clsx({
    'border-b border-gray-700': !isLastItem,
  });

  return { rounded, border };
};
