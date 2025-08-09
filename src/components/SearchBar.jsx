import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (query.trim() === '') return;
    navigate(`/products?name=${encodeURIComponent(query)}`);
    setQuery('');
  };

  return (
    <div className="dt:w-[593px] ph:w-[100px] h-[41px]  px-[11px] py-[9px] justify-between items-center rounded-[6px] border-[#D1D5DB] border-[1px] flex">
      <input
        id="search"
        type="text"
        value={query}
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e);
          }
        }}
        className="flex w-full"
      />
      <button type="button" onClick={handleSearch}>
        <img src="/search.svg" className="flex content-end cursor-pointer" />
      </button>
    </div>
  );
};

export default SearchBar;
