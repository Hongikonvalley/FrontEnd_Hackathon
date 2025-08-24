import { useEffect, useRef, useState } from 'react';
import { useStoresMeta } from '../hooks/useStoresMeta';

const DEFAULT_SLOTS = ['06:00-07:00', '07:00-08:00', '08:00-09:00'];

export default function DropdownTime({
  options = [],
  value,
  onChange,
  placeholder,
  design = '',
  font = 'semibold',
}) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const wrapRef = useRef(null);

  // const timeSlots = ['06:00-07:00', '07:00-08:00', '08:00-09:00'];
  // const handleTimeChange = (label) => {
  //   // timeSlots가 '07:00-08:00' 형식이면 그대로 저장
  //   setSelectedTime(label);
  // };

  // ① 부모 옵션 우선, 없으면 메타 호출
  const { data: meta, isLoading, isError } = useStoresMeta();
  const metaSlots = meta?.time_slots ?? [];
  const timeSlots =
    options && options.length
      ? options
      : metaSlots.length
        ? metaSlots
        : DEFAULT_SLOTS;

  // const list = value
  //   ? [value, ...timeSlots.filter((o) => o !== value)]
  //   : timeSlots;

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDoc = (e) => {
      if (!open) return;
      if (wrapRef.current && wrapRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex overflow-visible text-[12px]"
    >
      <div
        className={`relative z-50 w-fit h-fit border border-[#CBCBCB] justify-center items-end m-0 px-[6px] py-[2px] text-[12px] bg-white ${design} ${open ? '!rounded-[10px]' : ''}`}
      >
        <img src="./down.svg" className="absolute top-[8px] object-cover " />

        {open ? (
          timeSlots.map((label) => {
            const active = label === value;
            return (
              <button
                type="button"
                onClick={() => {
                  onChange?.(label);
                  setOpen(false);
                }}
                key={label}
                className={`h-fit w-auto pl-[12px] !rounded-[10px] flex flex-col bg-white
                       hover:bg-gray-100 ${active ? 'bg-primary text-secondary' : ''}`}
              >
                <span className={`text-[12px] font-${font}`}>{label}</span>
              </button>
            );
          })
        ) : (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`w-fit h-fit pl-[12px] py-0 flex items-end font-${font} `}
          >
            <span className={`text-[12px] text-black`}>
              {value || placeholder}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
