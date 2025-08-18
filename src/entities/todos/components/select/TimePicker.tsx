import { Check } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

interface TimePickerProps {
  onTimeChange: (hour: number | null, minute: number | null) => void;
  initialTime: Date | null;
  onClose: () => void;
}

const TimePicker = ({ onTimeChange, initialTime, onClose }: TimePickerProps) => {
  const [isPM, setIsPM] = useState(initialTime ? initialTime.getHours() >= 12 : false);
  const [selectedHour, setSelectedHour] = useState<number | null>(
    initialTime ? initialTime.getHours() % 12 || 12 : null,
  );
  const [selectedMinute, setSelectedMinute] = useState<number | null>(
    initialTime ? initialTime.getMinutes() : null,
  );

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const ampmRef = useRef<HTMLDivElement>(null);
  // const lastWheelTimestamp = useRef(0);

  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);

  useEffect(() => {
    if (initialTime) {
      const hours = initialTime.getHours();
      setIsPM(hours >= 12);
      setSelectedHour(hours % 12 || 12);
      setSelectedMinute(initialTime.getMinutes());
    } else {
      setSelectedHour(null);
      setSelectedMinute(null);
      setIsPM(false);
    }
  }, [initialTime]);

  const handleHourChange = (delta: number) => {
    const currentHour = new Date().getHours();
    const initialHour = currentHour % 12 || 12;

    let newHour = selectedHour !== null ? selectedHour + delta : initialHour;

    if (newHour < 1) newHour = 12;
    if (newHour > 12) newHour = 1;
    setSelectedHour(newHour);
  };

  const handleMinuteChange = (delta: number) => {
    const currentMinute = new Date().getMinutes();
    const initialMinute = Math.round(currentMinute / 5) * 5;

    let newMinute = selectedMinute !== null ? selectedMinute + delta * 5 : initialMinute;

    if (newMinute < 0) newMinute = 55;
    if (newMinute > 55) newMinute = 0;
    setSelectedMinute(newMinute);
  };

  const handleAMPMChange = () => {
    setIsPM(prev => !prev);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    e.preventDefault();
    const deltaY = e.clientY - startYRef.current;

    // 드래그 감도 조절 (예: 20px마다 1씩 변경)
    const threshold = 20;

    if (Math.abs(deltaY) > threshold) {
      const delta = deltaY > 0 ? 1 : -1;

      if (e.currentTarget === hourRef.current) {
        handleHourChange(-delta);
      } else if (e.currentTarget === minuteRef.current) {
        handleMinuteChange(-delta);
      } else if (e.currentTarget === ampmRef.current) {
        handleAMPMChange();
      }

      startYRef.current = e.clientY;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1 : -1;

      if (e.currentTarget === hourRef.current) {
        handleHourChange(delta);
      } else if (e.currentTarget === minuteRef.current) {
        handleMinuteChange(delta);
      } else if (e.currentTarget === ampmRef.current) {
        handleAMPMChange();
      }
    };

    const currentHourRef = hourRef.current;
    const currentMinuteRef = minuteRef.current;
    const currentAmpmRef = ampmRef.current;
    const documentBody = document.body;

    if (currentHourRef) {
      currentHourRef.addEventListener('wheel', handleWheelEvent, { passive: false });
      currentHourRef.addEventListener('mousemove', handleMouseMove);
    }
    if (currentMinuteRef) {
      currentMinuteRef.addEventListener('wheel', handleWheelEvent, { passive: false });
      currentMinuteRef.addEventListener('mousemove', handleMouseMove);
    }
    if (currentAmpmRef) {
      currentAmpmRef.addEventListener('wheel', handleWheelEvent, { passive: false });
      currentAmpmRef.addEventListener('mousemove', handleMouseMove);
    }

    // 마우스 업 이벤트는 전역적으로 감지
    documentBody.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (currentHourRef) {
        currentHourRef.removeEventListener('wheel', handleWheelEvent);
        currentHourRef.removeEventListener('mousemove', handleMouseMove);
      }
      if (currentMinuteRef) {
        currentMinuteRef.removeEventListener('wheel', handleWheelEvent);
        currentMinuteRef.removeEventListener('mousemove', handleMouseMove);
      }
      if (currentAmpmRef) {
        currentAmpmRef.removeEventListener('wheel', handleWheelEvent);
        currentAmpmRef.removeEventListener('mousemove', handleMouseMove);
      }
      documentBody.removeEventListener('mouseup', handleMouseUp);
    };
  }, [selectedHour, selectedMinute, isPM]);

  const handleReset = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedHour(null);
    setSelectedMinute(null);
    setIsPM(false);
    onTimeChange(null, null);

    setTimeout(() => {
      onClose();
    }, 0);
  };

  const handleConfirm = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedHour !== null && selectedMinute !== null) {
      let finalHour = selectedHour;
      if (isPM && selectedHour !== 12) {
        finalHour += 12;
      } else if (!isPM && selectedHour === 12) {
        finalHour = 0; // 자정 12시는 0시로
      }
      onTimeChange(finalHour, selectedMinute);
    }

    setTimeout(() => {
      onClose();
    }, 0);
  };

  return (
    <div className="flex flex-col space-y-0 w-48">
      {/* 시 선택 UI */}
      <div className="flex space-x-1 w-full px-3 py-4 text-white font-semibold text-lg items-center">
        <div
          ref={ampmRef}
          className="flex-1 rounded-2xl px-2 py-2 text-center flex flex-col items-center justify-center cursor-ns-resize hover:bg-gray-800 transition-colors duration-200"
        >
          <span>{isPM ? '오후' : '오전'}</span>
        </div>

        <div
          ref={hourRef}
          className="flex-1 rounded-2xl px-2 py-2 text-center flex flex-col items-center justify-center cursor-ns-resize hover:bg-gray-800"
        >
          <span>{selectedHour !== null ? String(selectedHour) : '--'}</span>
        </div>

        <div className="flex items-center text-gray-400 font-bold">:</div>

        <div
          ref={minuteRef}
          className="flex-1 rounded-2xl px-2 py-2 text-center flex flex-col items-center justify-center cursor-ns-resiz hover:bg-gray-800"
        >
          <span>{selectedMinute !== null ? String(selectedMinute).padStart(2, '0') : '--'}</span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <button
          type="button"
          onClick={handleReset}
          className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white rounded-full hover:bg-white/10 p-2"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="flex justify-center items-center h-8 w-8 rounded-full bg-[#5199fd] hover:bg-[#6daaff]"
          style={{ boxShadow: '0px 4px 24px 0 rgba(0,0,0,0.1)' }}
        >
          <Check className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
};

export default TimePicker;
