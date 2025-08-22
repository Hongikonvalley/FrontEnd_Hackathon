import { useEffect, useMemo, useState } from 'react';
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
import { TbLabel } from 'react-icons/tb';

const Stores = () => {
  const { setShowNavBar } = useOutletContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // 너희가 쓰는 키에 맞춰서 (예: name 또는 q)
  const raw = searchParams.get('name') ?? searchParams.get('q') ?? '';

  // +를 공백으로 보이게 하고 싶으면
  const value = raw.replace(/\+/g, ' ');

  const [filters, setFilters] = useState(['7-8시', '모닝세일']);

  const handleRemove = (target) => {
    setFilters((prev) => prev.filter((f) => f !== target));
  };
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

  // URL에서 모든 필터 값을 가져옵니다.
  {
    /*const filters = useMemo(
    () => ({
      name: (searchParams.get('q') ?? '').trim(),
      time: searchParams.get('time') ?? '',
      category: searchParams.get('category_id') ?? '',
    }),
    [searchParams]
  );*/
  }
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
        <div className="mt-[12px] mb-0 flex flex-row gap-[8px]">
          {filters.map((f) => (
            <FilteredList filtering={f} onClick={() => handleRemove(f)} />
          ))}
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
