// src/pages/StoreDetail.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stores } from '../data/mockStores';
import KakaoMap from '../components/KakaoMap';
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaRegImage,
  FaTimes,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import Header from '../components/Header';
import { useAuthStore } from '../stores/useAuthStore'; //로그인 여부를 확인한 후 리뷰 작성 가능

const StoreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = stores.find((s) => s.id === parseInt(id));
  const { isLoggedIn } = useAuthStore(); // 로그인 여부 확인

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      author: '멋쟁이사자',
      rating: 5,
      text: '여기 정말 좋아요! 노트북 들고 와서 작업하기 너무 편하고, 특히 치즈케이크가 정말 맛있습니다. 재방문 의사 100%!',
    },
    {
      author: '얼리버드',
      rating: 4,
      text: '아침 일찍 여는게 최고 장점! 커피 맛도 괜찮아요.',
    },
    {
      author: '리뷰어123',
      rating: 5,
      text: '분위기가 너무 좋아서 자주 찾게 되네요.',
    },
    {
      author: '방문객',
      rating: 3,
      text: '자리가 좀 협소한 것 빼고는 다 좋았어요.',
    },
    {
      author: '학생',
      rating: 4,
      text: '팀플하기 좋은 장소입니다. 콘센트 많아서 좋아요.',
    },
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);

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

  const handleLoadMoreReviews = () => {
    setVisibleReviewCount((prevCount) => prevCount + 3);
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

  const augmentedStore = {
    ...store,
    menuImageUrl: 'https://example.com/images/menu_full.jpg',
    keywords: [
      '카공하기 좋은 곳',
      '전좌석 콘센트',
      '테라스',
      '디저트 맛집',
      '조용한',
    ],
    aiSummary:
      '주로 오전 6시에 방문하고 아이스 아메리카노를 추천해요\n잉뉴님께서 좋아하시는 케이크와 한 잔 어떠세요?',
    featuredReview: {
      author: '멋쟁이사자',
      rating: 5,
      text: '여기 정말 좋아요! 노트북 들고 와서 작업하기 너무 편하고, 특히 치즈케이크가 정말 맛있습니다. 재방문 의사 100%!',
    },
  };

  if (!store) {
    return <div className="p-6">해당하는 가게 정보를 찾을 수 없습니다.</div>;
  }

  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(augmentedStore.name)}`;

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
              onClick={() => setIsFavorited(!isFavorited)}
              aria-label="Toggle Favorite"
            >
              <img
                src="/Heart.png" // public 폴더의 Heart.png 사용
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
          <h1 className="text-4xl font-bold text-black">
            {augmentedStore.name}
          </h1>
          <div className="flex items-center gap-1 text-xl font-bold">
            <FaStar className="text-primary" />
            <span>{augmentedStore.reviewSummary.averageRating}</span>
            <span className="text-sm font-normal text-gray-500">
              ({augmentedStore.reviewSummary.totalReviews})
            </span>
          </div>
        </div>

        {/* 위치와 영업시간 */}
        <div className="flex flex-wrap justify-between items-center text-gray-600 border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span>{augmentedStore.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span>
              {augmentedStore.openTime} ~ {augmentedStore.closeTime}
            </span>
          </div>
        </div>

        {/* 카카오 지도 */}
        <div className="mb-6 h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
          <KakaoMap
            lat={augmentedStore.location.latitude}
            lng={augmentedStore.location.longitude}
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
                <p className="font-semibold">{augmentedStore.menu[0].name}</p>
                <p className="text-gray-600">
                  {augmentedStore.menu[0].price.toLocaleString()}원
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
            {augmentedStore.galleryImages.map((src, index) => (
              <div key={index} className="flex-shrink-0 w-40 h-40">
                <img
                  src={src}
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
            <p className="text-black">{augmentedStore.aiSummary}</p>
          </div>
          <div className="space-y-4">
            {reviews.slice(0, visibleReviewCount).map((review, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.author}</span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-primary" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-800">{review.text}</p>
              </div>
            ))}
          </div>
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
            <img
              src={augmentedStore.menuImageUrl}
              alt="메뉴판"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
