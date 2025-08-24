// src/pages/StoreDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStoreById,
  getStoreReviews,
  toggleFavoriteStore,
} from '../apis/stores';
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaRegImage,
  FaTimes,
} from 'react-icons/fa';
import Header from '../components/Header';
import { useAuthStore } from '../stores/useAuthStore'; //로그인 여부를 확인한 후 리뷰 작성 가능

const StoreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore(); // 로그인 여부 확인
  const queryClient = useQueryClient(); // 👈 이 라인을 추가하세요.

  const {
    data: store,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['storeDetail', id],
    queryFn: () => getStoreById(id),
    enabled: !!id,
  });

  const { data: reviewData, isLoading: isReviewLoading } = useQuery({
    queryKey: ['storeReviews', id],
    queryFn: () => getStoreReviews(id),
    enabled: !!id, // id가 있을 때만 요청
  });

  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [page, setPage] = useState(1); // 현재 페이지 번호 state
  const [hasNextPage, setHasNextPage] = useState(true); // 다음 페이지 존재 여부
  const [showFavoriteAlert, setShowFavoriteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const favoriteMutation = useMutation({
    // isFavorited 상태를 함께 전달
    mutationFn: () =>
      toggleFavoriteStore({ storeId: id, isFavorite: isFavorited }),

    onSuccess: (data) => {
      const newIsFavorited = data.result.is_favorite;
      setIsFavorited(newIsFavorited);

      setAlertMessage(data.result.message); // "즐겨찾기에 추가/삭제되었습니다" 메시지
      setShowFavoriteAlert(true);
      setTimeout(() => setShowFavoriteAlert(false), 2000);

      // 즐겨찾기 목록과 현재 가게 상세 정보 쿼리를 모두 무효화하여 최신 상태로 업데이트
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['storeDetail', id] });
    },
    onError: () => {
      alert('즐겨찾기 처리에 실패했습니다.');
    },
  });

  useEffect(() => {
    if (store) {
      setIsFavorited(store.user_context.is_favorite);
    }
  }, [store]);

  useEffect(() => {
    if (reviewData) {
      console.log('--- [Debug] 서버로부터 받은 리뷰 데이터 원본 ---');
      console.log(reviewData);
      console.log('-------------------------------------------');
    }
  }, [reviewData]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopyAlert(true);
      setTimeout(() => setShowCopyAlert(false), 2000);
    } catch (err) {
      console.error('URL 복사 실패:', err);
      alert('URL 복사에 실패했습니다.');
    }
  };

  const handleReviewSubmit = () => {
    if (newReviewText.trim() === '') {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }
    const newReview = {
      author: '나 (새로운 유저)',
      rating: newReviewRating,
      text: newReviewText,
    };
    setReviews([newReview, ...reviews]);
    setIsReviewModalOpen(false);
    setNewReviewText('');
    setNewReviewRating(5);
  };

  // 3. 리뷰 작성창을 여는 핸들러 함수 생성
  const handleOpenReviewModal = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/'); // 로그인 페이지로 이동
      return;
    }
    setIsReviewModalOpen(true);
  };

  const handleLoadMoreReviews = () => {
    // 보여줄 리뷰 개수를 3개씩 늘립니다.
    setVisibleReviewCount((prevCount) => prevCount + 3);
  };

  if (isLoading)
    return <div className="p-6 text-center">가게 정보를 불러오는 중...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">오류가 발생했습니다.</div>
    );
  if (!store)
    return (
      <div className="p-6 text-center">
        해당하는 가게 정보를 찾을 수 없습니다.
      </div>
    );

  const reviews = reviewData?.reviews || [];

  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(store.name)}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header title={store.name} showBack={true} />

      {/* 👇 헤더 아래의 모든 컨텐츠를 담는 하나의 부모 div */}
      <div className="p-4 md:p-6 ">
        {/* 아침 혜택 및 즐겨찾기/공유 섹션 */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-orange-100 text-secondary font-bold py-2 px-4 rounded-full text-sm">
            오전 7시 방문 얼리버드 10% 할인
          </div>
          <div className="flex items-center gap-4 text-2xl">
            <button
              onClick={() => favoriteMutation.mutate()}
              aria-label="Toggle Favorite"
            >
              <img
                src="/Heart.png"
                alt="Favorite"
                className={`w-6 h-6 transition-opacity ${isFavorited ? 'opacity-100' : 'opacity-40'}`}
              />
            </button>
            <button onClick={handleShare} aria-label="Share">
              <img
                src="/Share.png" // public 폴더의 Share.png 사용
                alt="Share"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* 매장 이름과 별점 */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-4xl font-bold text-black">{store.name}</h1>
          <div className="flex items-center gap-1 text-xl font-bold">
            <FaStar className="text-primary" />
            <span>{store.average_rating}</span>
            <span className="text-sm font-normal text-gray-500">
              ({store.total_reviews})
            </span>
          </div>
        </div>

        {/* 위치와 영업시간 */}
        <div className="flex flex-wrap justify-between items-center text-gray-600 border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span>{store.address}</span>
          </div>
          {/*
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span>
              {store.openTime} ~ {store.closeTime}
            </span>
          </div>
          */}
        </div>

        {/* 카카오 지도 */}
        <div className="mb-6 h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
          <KakaoMap
            lat={store.location.latitude}
            lng={store.location.longitude}
            name={store.name}
          />
        </div>
        {/* 👇 '지도 앱에서 보기' 버튼 추가 */}
        <div className="flex items-center gap-1 mb-6">
          <a
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black font-bold px-4 py-2 rounded-lg shadow-md"
          >
            <img
              src="/icons8-지리적-울타리-50.png"
              alt="네이버 지도 아이콘"
              className="w-5 h-5"
            />
            네이버 지도에서 보기
          </a>
        </div>

        {/* 메뉴 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">메뉴</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{store.menus[0].name}</p>
                <p className="text-gray-600">
                  {store.menus[0].price.toLocaleString()}원
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <FaRegImage />
                메뉴판 이미지로 보기
              </button>
            </div>
          </div>
        </div>

        {/* 포토리뷰 (사이드 스크롤) */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">포토</h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {/* API로부터 받은 photos 배열을 map으로 순회 */}
            {reviewData.photos.map((imageUrl, index) => (
              <div key={index} className="flex-shrink-0 w-40 h-40">
                <img
                  src={imageUrl}
                  alt={`포토리뷰 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 방문자 리뷰 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-black">방문자 리뷰</h2>
            <button onClick={() => setIsReviewModalOpen(true)}>
              <img
                src="/Pencil.png"
                alt="리뷰 작성"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
            {/*
            로그인 기능 구현시 교체(로그인 여부 확인 후 리뷰 작성 가능)
            <button onClick={handleOpenReviewModal}>
              <img src="/Pencil.png" alt="리뷰 작성" className="w-6 h-6 cursor-pointer" />
            </button>
            */}
          </div>
          <p className="text-gray-600 mb-4">
            리뷰를 작성하시면 10포인트를 드려요!
          </p>

          {/* AI 리뷰 요약 */}
          <div className="bg-orange-100 p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold mb-2 text-secondary">
              more;ing AI
            </h3>
            <p className="text-black">{reviewData.ai_summary.content}</p>
          </div>

          <div className="space-y-4">
            {/* slice를 사용하여 visibleReviewCount 개수만큼만 리뷰를 표시 */}
            {reviews.slice(0, visibleReviewCount).map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.user_nickname}</span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-primary" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-800">{review.content}</p>
              </div>
            ))}
          </div>
          {isReviewLoading && <div>리뷰를 불러오는 중...</div>}
          {reviews.length > visibleReviewCount && (
            <div className="text-center mt-4">
              <button
                onClick={handleLoadMoreReviews}
                className="text-sm text-gray-500 hover:underline"
              >
                &lt;리뷰 더보기&gt;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* URL 복사 알림 */}
      {showCopyAlert && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          URL이 복사되었습니다.
        </div>
      )}

      {showFavoriteAlert && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {alertMessage}
        </div>
      )}

      {/* 리뷰 작성 모달 */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 h-full bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">리뷰 작성</h3>
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${newReviewRating >= star ? 'text-primary' : 'text-gray-300'}`}
                  onClick={() => setNewReviewRating(star)}
                />
              ))}
            </div>
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              className="w-full h-32 p-2 border rounded-md"
              placeholder="리뷰를 작성해주세요..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                취소
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메뉴판 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-4 -right-4 text-2xl text-white bg-black rounded-full p-1 leading-none"
            >
              <FaTimes />
            </button>
            {/*
            <img
              src={store.menuImageUrl}
              alt="메뉴판"
              className="w-full h-auto"
            />
            */}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
