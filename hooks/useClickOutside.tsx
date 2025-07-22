import React, { useEffect } from "react";

interface useClickOutsideProps {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
}

export const useClickOutside = ({ ref, callback }: useClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback]);
};
