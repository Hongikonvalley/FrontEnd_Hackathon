// src/pages/Stores.jsx

import { useEffect, useMemo } from 'react';
import { stores } from '../data/mockStores'; // 전체 Mock Data 불러오기
import StoreCard from '../components/StoreCard';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import instance from '../apis/axios';

// 한글/대소문자/공백 정규화
const normalize = (s = '') =>
  s.normalize('NFC').toLowerCase().replace(/\s+/g, '');
const matches = (name, q) => normalize(name).includes(normalize(q));

const Stores = () => {
  // PING
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const r = await instance.get('/stores');
  //       console.log(
  //         '[PING] /stores OK',
  //         r.status,
  //         Array.isArray(r.data) ? r.data.length : r.data
  //       );
  //     } catch (e) {
  //       console.error('[PING] /stores FAIL', e);
  //     }
  //   })();
  // }, []);

  // 내비바 숨김
  const { setShowNavBar } = useOutletContext();
  useEffect(() => {
    setShowNavBar(false); // 페이지 들어올 때 숨김
    return () => setShowNavBar(true); // 페이지 나갈 때 복구
  }, [setShowNavBar]);

  const nav = useNavigate();
  const [params] = useSearchParams();
  const name = params.get('name');

  //🔽 이건 API 연결용
  // // useQuery로 데이터 가져오기
  // const {
  //   data: productsRaw = [],
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['stores', name],
  //   queryFn: () => (name.trim() ? getStoresByName(name) : fetchAllStores()),
  //   // enabled: !!name,
  // });

  // // 부분검색 적용
  // const products = useMemo(() => {
  //   if (!name) return productsRaw; // useQuery로 받은 원본 리스트
  //   return (productsRaw ?? []).filter((p) => matches(p.name, name));
  // }, [productsRaw, name]);

  // if (isLoading) return <div className="p-4">검색 중...</div>;
  // if (error) return <div className="p-4">ERROR</div>;
  // if (!stores || stores.length === 0)
  //   return (
  //     <div className="font-Inter flex justify-center mt-[32px] text-xl">
  //       검색 결과가 없습니다🥺
  //     </div>
  //   );

  // 🔽 Local Mock Data 사용
  const filteredStores = useMemo(() => {
    if (!name) return stores; // 전체 Mock Data
    return stores.filter((s) => matches(s.name, name));
  }, [name]);

  return (
    <div className="p-6 bg-white min-h-screen ">
      <div className="flex flex-row items-center content-center justify-between mb-6">
        <img
          src="/Back.svg"
          alt="Back"
          className="w-[36px] h-[36px]"
          onClick={() => nav(-1)} // 뒤로가기
        />
        <p className="text-[30px]">more;ing</p>
        <img src="/Menu.png" alt="Menu" className="w-[40px] h-[40px]" />
      </div>

      {/* 검색 결과 부분 */}
      <div className="flex flex-row mb-[8px] p-[6px]">
        <p className="font-bold">{name}</p>
        <p>의 검색 결과입니다.</p>
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
        {/* stores 배열의 각 item을 store라는 이름으로 StoreCard에 전달 */}
        {filteredStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default Stores;
