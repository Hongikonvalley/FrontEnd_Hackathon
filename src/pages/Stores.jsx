import { useEffect, useMemo } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { stores } from '../data/mockStores'; // 1. Mock Data를 다시 import 합니다.
import { fetchAllStores, getStoresByName } from '../apis/stores';
import StoreCard from '../components/StoreCard';

const Stores = () => {
  const { setShowNavBar } = useOutletContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 모든 필터 값을 가져옵니다.
  const name = searchParams.get('name');
  const time = searchParams.get('time');
  const category = searchParams.get('category');

  // 내비바 숨김 처리
  useEffect(() => {
    setShowNavBar(false);
    return () => setShowNavBar(true);
  }, [setShowNavBar]);

  /*
  // 🔽 나중에 실제 API를 사용할 코드 (주석 처리)
  const {
    data: storesFromAPI = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stores', name, time, category], // 모든 필터 값을 key로 사용
    queryFn: () => {
      // 실제 API 호출 시에는 백엔드에 모든 필터를 넘겨줘야 합니다.
      // 예: return getStoresByFilter({ name, time, category });
      return name ? getStoresByName(name) : fetchAllStores()
    },
  });

  if (isLoading) return <div className="p-4 text-center">검색 중...</div>;
  if (error) return <div className="p-4 text-center text-red-500">오류가 발생했습니다: {error.message}</div>;
  */

  // 🔽 Mock Data를 사용하도록 다시 변경
  const filteredStores = useMemo(() => {
    let filteredData = stores;

    // 시간 필터
    if (time) {
      const [startHour] = time.split('-').map(Number);
      filteredData = filteredData.filter((store) => {
        const openHour = parseInt(store.openTime.split(':')[0]);
        return openHour >= startHour && openHour < startHour + 1;
      });
    }

    // 카테고리 필터
    if (category) {
      filteredData = filteredData.filter(
        (store) => store.category === category
      );
    }

    // 이름(검색어) 필터
    if (name) {
      filteredData = filteredData.filter((store) =>
        store.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return filteredData;
  }, [name, time, category]);

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
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))
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
