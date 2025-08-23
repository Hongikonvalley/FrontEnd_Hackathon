import { useEffect, useRef, useState } from 'react';

export default function DropdownMenu({
  options = [], // ['5시부터 6시까지', '6시부터 7시까지', ...]
  value,
  onChange,
  placeholder,
  design = '',
  font = 'semibold',
  type = '',
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const list =
    type === 'time'
      ? options
      : value
        ? [value, ...options.filter((o) => o !== value)]
        : options;

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
        className={`relative z-50 w-fit border border-[#CBCBCB] justify-center items-end m-0 px-[6px] py-[3px] text-[12px] bg-white ${design} ${open ? '!rounded-[10px]' : ''}`}
      >
        <img src="./down.svg" className="absolute top-[8px] " />
        {open ? (
          list.map((label) => {
            const active = label === value;
            return (
              <button
                type="button"
                onClick={() => {
                  onChange?.(label);
                  setOpen(false);
                }}
                key={label}
                className={`h-auto w-auto pl-[12px] !rounded-[10px] flex flex-col bg-white
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
            className={`w-fit pl-[12px] flex items-end font-${font}`}
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
