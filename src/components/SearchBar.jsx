import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  variant,
  label = '',
  holder,
  selectedTime,
  selectedSale,
  selectedCategory,
  selectedDay,
}) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (query.trim()) params.append('name', query.trim());
    if (selectedTime) params.append('time', selectedTime);
    if (selectedSale) params.append('sale', selectedSale);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedDay) params.set('day', selectedDay); // ★ 요일 유지

    navigate(`/stores?${params.toString()}`);
    setQuery('');
    inputRef.current?.blur();
  };

  const base =
    'w-full h-[40px] text-[14px] bg-white px-[16px] py-[10px] justify-between items-center rounded-[20px] flex mt-[16px]' +
    (variant === 'search' ? ' border-1 border-[#CECECE]' : '');

  const showHint =
    variant === 'search' && !focused && query.length === 0 && (label || holder);

  return (
    <div className={base}>
      {showHint && (
        <span className="pointer-events-none absolute flex">
          <span className="text-secondary font-semibold">{label}</span>
          <span className="text-black font-semibold">&nbsp;{holder}</span>
        </span>
      )}

      {/* 실제 입력창 */}
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        // plain 모드: 네이티브 placeholder 사용
        // hint 모드: 가짜 placeholder 겹치지 않게 비워둠 + 투명 글자
        placeholder={variant === 'main' ? holder : ''}
        className={'flex-1 bg-transparent outline-none caret-black '}
        aria-label={variant === 'main' ? holder : `${label} ${holder}`}
      />

      {/* <input
        type="text"
        value={query}
        placeholder={holder}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        className={search + ' flex w-full outline-none value:text-secondary'}
      /> */}

      <button type="button" onClick={handleSearch}>
        <img
          src="http://localhost:3000/Search.png"
          className="flex content-end cursor-pointer"
          alt="search icon"
        />
      </button>
    </div>
  );
};

export default SearchBar;
