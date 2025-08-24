// src/components/ReviewCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <div className="bg-gray-50 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{review.store_name}</h2>
          <div className="flex items-center gap-1 font-bold text-yellow-500">
            <FaStar />
            <span>{review.rating}</span>
          </div>
        </div>
        <p className="text-gray-800">{review.content}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-md hover:bg-secondary transition-colors"
            onClick={() => navigate(`/store/${review.store_id}`)}
          >
            가게 상세정보 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

// API 명세서에 맞게 PropTypes 수정
ReviewCard.propTypes = {
  review: PropTypes.shape({
    review_id: PropTypes.string.isRequired,
    store_id: PropTypes.string.isRequired,
    store_name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewCard;
