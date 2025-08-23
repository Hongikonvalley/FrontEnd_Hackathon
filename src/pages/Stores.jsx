import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAllStores,
  getStoresByName,
  getStoresFiltered,
} from '../apis/stores';
import StoreCard from '../components/StoreCard';
import Header from '../components/Header';
import { stores } from '../data/mockStores';
import SearchBar from '../components/SearchBar';
import FilteredList from '../components/FilteredList';
import DropdownMenu from '../components/DropdownMenu';

const sortLabel = (s) => (s === 'rating' ? '별점순' : '거리순');
const sortValue = (label) => (label === '별점순' ? 'rating' : 'distance');

const pad = (n) => String(n).padStart(2, '0');

// '07:00-08:00' -> '07-08시'
const timeToChip = (t) => {
  if (!t) return '';
  const [s, e] = t.split('-');
  return `${s.slice(0, 2)}-${e.slice(0, 2)}시`;
};

// '07-08시' / '7-8시' -> '07:00-08:00'
const chipToTime = (label) => {
  const m = label.match(/(\d{1,2})\s*-\s*(\d{1,2})/);
  if (!m) return '';
  return `${pad(m[1])}:00-${pad(m[2])}:00`;
};

const Stores = () => {
  const { setShowNavBar } = useOutletContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 쓰는 키에 맞춰서 (예: name 또는 q)
  const raw = searchParams.get('name') ?? searchParams.get('q') ?? '';

  // +를 공백으로 보이게 하고 싶으면
  const value = raw.replace(/\+/g, ' ');

  const option = ['거리순', '별점순'];
  const [options, setOptions] = useState('');

  const upsertParams = useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(patch).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '' || v === false)
          next.delete(k);
        else next.set(k, String(v));
      });
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  // URL -> 필터
  const filters = useMemo(() => {
    const saleRaw = (searchParams.get('sale') ?? '').toLowerCase();
    const sale = saleRaw === '1' || saleRaw === 'true'; // ← 문자열 'true'/'1' 처리
    return {
      name: (searchParams.get('name') ?? searchParams.get('q') ?? '').trim(),
      time: searchParams.get('time') ?? '',
      sale, // ✅
      sort: searchParams.get('sort') ?? 'distance',
    };
  }, [searchParams]);
  // 필터 -> 칩(표시용)
  const chips = useMemo(() => {
    const arr = [];
    if (filters.time) arr.push(timeToChip(filters.time));
    if (filters.sale) arr.push('모닝세일');
    return arr;
  }, [filters]);

  // 칩 제거
  const removeChip = useCallback(
    (label) => {
      if (label === '모닝세일') upsertParams({ sale: '' });
      else if (/\d/.test(label)) upsertParams({ time: '' }); // 시간칩
    },
    [upsertParams]
  );

  // // 확인
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const list = await fetchAllStores();
  //       console.log('[DEBUG] ALL STORES:', list);
  //       console.log('[DEBUG] COUNT:', list.length);
  //       if (list[0]) console.log('[DEBUG] FIRST:', list[0]);
  //     } catch (e) {
  //       console.error('[DEBUG] fetchAllStores FAIL', e);
  //     }
  //   })();
  // }, []);

  // 내비바 숨김 처리
  useEffect(() => {
    setShowNavBar(false);
    return () => setShowNavBar(true);
  }, [setShowNavBar]);

  // const filters = Object.fromEntries(searchParams.entries());

  // // 메타 조회
  // const { data: meta } = useQuery({
  //   queryKey: ['search/filter'],
  //   queryFn: getStoresByFilter,
  // });
  // const categories = meta?.categories ?? [];
  // const times = meta?.times ?? [];

  // const {
  //   data: stores = [],
  //   isLoading,
  //   error,
  // } = useQuery({
  //   //queryKey: ['stores', filters.name, filters.time, filters.category],
  //   queryKey: ['stores', filters],

  /*
      queryFn: () => {
      const hasAnyFilter =
        !!filters.name || !!filters.time || !!filters.category;
      // ★ 반드시 반환해야 함
      return hasAnyFilter ? getStoresFiltered(filters) : fetchAllStores();
    },
    */
  //   queryFn: () => getStoresFiltered(filters),
  //   keepPreviousData: true,
  // });

  // if (isLoading) return <div className="p-4 text-center">검색 중...</div>;
  // if (error)
  //   return (
  //     <div className="p-4 text-center text-red-500">
  //       오류가 발생했습니다: {error.message}
  //     </div>
  //   );

  const handleTimeChange = (label) => upsertParams({ time: chipToTime(label) });
  const handleSortChange = (label) => upsertParams({ sort: sortValue(label) });

  return (
    <>
      <Header showBack={true} />

      {/* filtering */}
      <div className="flex flex-col mb-[4px] p-[6px] mx-[24px]">
        <SearchBar
          variant="search"
          label={value}
          holder={`의 검색결과입니다.`}
        />
        <div className="flex flex-row justify-between items-start mt-[12px]">
          <div className="mb-0 flex flex-row gap-[8px]">
            {chips.map((f) => (
              <FilteredList filtering={f} onClick={() => removeChip(f)} />
            ))}
          </div>

          <DropdownMenu
            options={option}
            value={sortLabel(filters.sort) || ''}
            onChange={handleSortChange}
            placeholder={option[0]}
            design="rounded-[10px]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center px-[16px] w-full max-w-4xl mx-auto">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
      {/* <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
        {stores.length > 0 ? (
          stores.map((store) => <StoreCard key={store.id} store={store} />)
        ) : (
          <div className="font-Inter flex justify-center mt-[32px] text-xl">
            검색 결과가 없습니다🥺
          </div>
        )}
      </div> */}
    </>
  );
};

export default Stores;
