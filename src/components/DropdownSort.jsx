import { useEffect, useRef, useState } from 'react';

export default function DropdownSort({
  value,
  onChange,
  placeholder,
  design = '',
  font = 'semibold',
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const option = ['거리순', '별점순'];
  const [selectedSort, setSelectedSort] = useState(null);

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

  const handleToggleSort = (label) => {
    setselectedSort(label);
  };

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
          option.map((label) => {
            const active = label === selectedSort;
            return (
              <button
                type="button"
                onClick={() => {
                  onChange?.(label);
                  setOpen(false);
                  handleToggleSort(lable);
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
            className={`w-fit h-fit pl-[12px] py-0 flex items-end font-${font}`}
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
