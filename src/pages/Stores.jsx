import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFilteredStores } from '../hooks/useFilteredStores';
import { useStoresMeta } from '../hooks/useStoresMeta';
import { useStoresByMenuKeyword } from '../hooks/useStoresMenu';
import { getStoresFiltered } from '../apis/stores';
import StoreCard from '../components/StoreCard';
import Header from '../components/Header';
// import { stores } from '../data/mockStores';
import SearchBar from '../components/SearchBar';
import DropdownTime from '../components/DropdownTime';
import DropdownSort from '../components/DropdownSort';
import FilterButton from '../components/FilterButton';

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
  const [selectedTime, setSelectedTime] = useState('');
  const { data: meta } = useStoresMeta();
  const timeOptions = meta?.time_slots ?? [];
  const KOR_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const todayKorDay = KOR_DAYS[new Date().getDay()]; // 기본값

  // URL -> 필터
  const filters = useMemo(() => {
    const saleRaw = (searchParams.get('sale') ?? '').toLowerCase();
    const sale = saleRaw === '1' || saleRaw === 'true';
    const KOR_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
    const today = KOR_DAYS[new Date().getDay()];
    return {
      q: (searchParams.get('q') ?? searchParams.get('name') ?? '').trim(), // ← 검색어 통합
      time: searchParams.get('time') ?? '',
      day: searchParams.get('day') ?? today,
      sale,
      category: (searchParams.get('category') ?? '').trim(),
      sort: searchParams.get('sort') ?? 'distance',
      page: Number(searchParams.get('page') ?? '1'),
    };
  }, [searchParams]);

  const useMenuMode = !!filters.q;

  useEffect(() => {
    console.log('[timeOptions]', timeOptions);
  }, [timeOptions]);

  // 쓰는 키에 맞춰서 (예: name 또는 q)
  const raw = searchParams.get('name') ?? searchParams.get('q') ?? '';

  // +를 공백으로 보이게 하고 싶으면
  const value = raw.replace(/\+/g, ' ');

  // const [options, setOptions] = useState('');

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

  // ✅ 메뉴 모드일 때
  const {
    data: menuStores,
    isLoading: loadingMenu,
    isError: errorMenu,
  } = useStoresByMenuKeyword({
    q: filters.q,
    time: filters.time,
    dayOfWeek: filters.day,
    sale: filters.sale,
    category: filters.category,
    page: filters.page,
    size: 20,
    sort: filters.sort,
    availableOnly: true,
    candidateFromName: true,
  });

  // ✅ 메뉴 모드가 아닐 때 (기존 훅)
  // NOTE: 기존 useFilteredStores 훅 구현이 name을 받는다면 q를 name에 할당해도 됨.
  const {
    data: plainData,
    isLoading: loadingPlain,
    isError: errorPlain,
  } = useFilteredStores(
    {
      q: undefined,
      name: '', // ← 매장명으로는 검색 안 함
      time: filters.time,
      dayOfWeek: filters.day,
      sale: filters.sale,
      category: filters.category,
      page: filters.page,
      size: 20,
      sort: filters.sort,
    },
    { enabled: !useMenuMode }
  ); // 훅이 옵션 객체 받으면 enabled 전달

  // ✅ 최종 표시 데이터
  const items = useMenuMode
    ? (menuStores ?? [])
    : (plainData?.result?.items ?? plainData?.items ?? []);

  const isLoading = useMenuMode ? loadingMenu : loadingPlain;
  const isError = useMenuMode ? errorMenu : errorPlain;

  // // ★ 데이터 패칭
  // const { data, isLoading } = useFilteredStores({
  //   name: filters.name,
  //   time: filters.time, // "06:00-07:00" -> API에서 "06:00"으로 변환됨
  //   dayOfWeek: filters.day, // ★ 요일 전달
  //   sale: filters.sale,
  //   category: filters.category,
  //   page: filters.page,
  //   size: 20,
  //   sort: filters.sort,
  // });

  // const items = data?.result?.items ?? data?.items ?? [];

  // 내비바 숨김 처리
  useEffect(() => {
    setShowNavBar(false);
    return () => setShowNavBar(true);
  }, [setShowNavBar]);

  const handleSortChange = (label) => upsertParams({ sort: sortValue(label) });

  return (
    <>
      <Header showBack={true} />

      {/* filtering */}
      <div className="flex flex-col mb-[4px] p-[6px] mx-[24px]">
        <SearchBar
          variant="search"
          label={value}
          holder="의 검색결과입니다."
          selectedTime={filters.time}
          selectedSale={filters.sale}
          selectedCategory={filters.category}
          selectedDay={filters.day} // ★ 추가
        />
        <div className="flex flex-row justify-between items-start mt-[12px]">
          <div className="mb-0 flex flex-row gap-[8px]">
            <FilterButton
              label="모닝세일"
              selected={filters.sale}
              onClick={() => {
                upsertParams({ sale: filters.sale ? '' : '1' });
                console.log('got');
              }}
            />
          </div>
          <select
            value={filters.day}
            onChange={(e) => upsertParams({ day: e.target.value, page: 1 })}
            className="border rounded-[10px] px-3 py-2 mr-2"
          >
            {KOR_DAYS.map((d) => (
              <option key={d} value={d}>
                {d}요일
              </option>
            ))}
          </select>

          <div className="flex gap-[6px]">
            <DropdownTime
              options={timeOptions}
              placeholder={filters.time ? timeToChip(filters.time) : ''}
              value={filters.time}
              onChange={(t) => upsertParams({ time: t })}
              design=" rounded-[20px] h-min py-0"
              font="medium"
              rounded="[20px]"
            />
            <DropdownSort
              value={sortLabel(filters.sort) || ''}
              onChange={handleSortChange}
              design="rounded-[20px]"
              font="medium"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-[16px] w-full max-w-4xl mx-auto">
        {isLoading ? (
          <div className="mt-8">불러오는 중 ...</div>
        ) : isError ? (
          <div className="mt-8 text-red-500">검색 실패 😢</div>
        ) : items.length ? (
          items.map((store) => (
            <StoreCard key={store.id ?? store.store_id} store={store} />
          ))
        ) : (
          <div className="mt-8 text-gray-500">검색 결과가 없습니다 🥺</div>
        )}
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto"></div>
    </>
  );
};

export default Stores;
