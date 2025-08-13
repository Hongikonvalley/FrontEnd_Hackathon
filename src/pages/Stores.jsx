import { useEffect, useMemo } from 'react';
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

const Stores = () => {
  const { setShowNavBar } = useOutletContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 확인
  useEffect(() => {
    (async () => {
      try {
        const list = await fetchAllStores();
        console.log('[DEBUG] ALL STORES:', list);
        console.log('[DEBUG] COUNT:', list.length);
        if (list[0]) console.log('[DEBUG] FIRST:', list[0]);
      } catch (e) {
        console.error('[DEBUG] fetchAllStores FAIL', e);
      }
    })();
  }, []);

  // 내비바 숨김 처리
  useEffect(() => {
    setShowNavBar(false);
    return () => setShowNavBar(true);
  }, [setShowNavBar]);

  // URL에서 모든 필터 값을 가져옵니다.
  const filters = useMemo(
    () => ({
      name: (searchParams.get('name') ?? '').trim(),
      time: searchParams.get('time') ?? '',
      category: searchParams.get('category') ?? '',
    }),
    [searchParams]
  );

  // // 메타 조회
  // const { data: meta } = useQuery({
  //   queryKey: ['search/filter'],
  //   queryFn: getStoresByFilter,
  // });
  // const categories = meta?.categories ?? [];
  // const times = meta?.times ?? [];

  const {
    data: stores = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stores', filters.name, filters.time, filters.category],
    queryFn: () => {
      const hasAnyFilter =
        !!filters.name || !!filters.time || !!filters.category;
      // ★ 반드시 반환해야 함
      return hasAnyFilter ? getStoresFiltered(filters) : fetchAllStores();
    },
    keepPreviousData: true,
  });

  if (isLoading) return <div className="p-4 text-center">검색 중...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        오류가 발생했습니다: {error.message}
      </div>
    );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-row items-center content-center justify-between mb-6">
        <img
          src="/Back.svg"
          alt="Back"
          className="w-[36px] h-[36px] cursor-pointer"
          onClick={() => navigate(-1)} // 뒤로가기
        />
        <p className="text-[30px]">more;ing</p>
        <img src="/Menu.png" alt="Menu" className="w-[40px] h-[40px]" />
      </div>

      <div className="flex flex-row mb-[8px] p-[6px]">
        <p>검색 결과입니다.</p>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
        {stores.length > 0 ? (
          stores.map((store) => <StoreCard key={store.id} store={store} />)
        ) : (
          <div className="font-Inter flex justify-center mt-[32px] text-xl">
            검색 결과가 없습니다🥺
          </div>
        )}
      </div>
    </div>
  );
};

export default Stores;
