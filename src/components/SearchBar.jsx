import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ selectedTime, selectedCategory }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.append('name', query.trim());
    }
    if (selectedTime) {
      params.append('time', selectedTime);
    }
    if (selectedCategory) {
      params.append('category', selectedCategory);
    }

    navigate(`/stores?${params.toString()}`);
  };

  return (
    <div className="w-full h-[40px] bg-white px-[10px] py-[10px] justify-between items-center rounded-[20px] flex mt-[16px]">
      <input
        type="text"
        value={query}
        placeholder="지금 떠오르는 메뉴를 검색해보세요"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        className="flex w-full outline-none"
      />
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
