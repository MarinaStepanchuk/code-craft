import { useState, useEffect, useRef, Dispatch, MutableRefObject, SetStateAction } from 'react';

const useOutsideClick = (
  initialValue: boolean
): {
  ref: MutableRefObject<HTMLDivElement | null>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
} => {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: Event): void => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return { ref, isActive, setIsActive };
};

export default useOutsideClick;
