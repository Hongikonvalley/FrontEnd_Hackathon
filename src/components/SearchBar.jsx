import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (query.trim() === '') return;
    navigate(`/stores?name=${encodeURIComponent(query)}`);
    setQuery('');
  };

  return (
    <div className="w-full h-[40px] bg-white px-[10px] py-[10px] justify-between items-center rounded-[20px] flex mt-[16px]">
      <input
        id="search"
        type="text"
        value={query}
        placeholder="지금 떠오르는 메뉴를 검색해보세요"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e);
          }
        }}
        className="flex w-full"
      />
      <button type="button" onClick={handleSearch}>
        <img src="/Search.png" className="flex content-end cursor-pointer" />
      </button>
    </div>
  );
};

export default SearchBar;
