import { useNavigate } from 'react-router-dom';

const FavoriteCard = () => {
  const nav = useNavigate();

  return (
    <div className="flex flex-col p-[30px] border-orange-400 border-2 bg-white shadow-md rounded-[20px] m-[20px]">
      <div className="flex flex-row items-center justify-between">
        <div>
          <div className="text-[20px] font-semibold">가비애</div>
          <div className="text-[30px] font-black text-amber-400">n회 방문</div>
          <div className="text-[14px] font-medium">가게 정보</div>
        </div>
        <img
          src="/ex.jpg"
          alt="가게 이미지"
          className="w-2/5 h-auto rounded-[15px] aspect-square"
        />
      </div>
      <div>
        <div className="text-[14px]">나의 메뉴</div>
      </div>

      <div className="border-t-1 w-full border-gray-400 my-[20px]" />

      <div className="flex flex-row items-center justify-end gap-[10px]">
        <div>할인정보</div>
        <button
          type="button"
          className="bg-amber-500 rounded-[20px] h-[30px] w-1/2 text-[14px] text-white font-bold hover:cursor-pointer"
          onClick={() => nav('/')}
        >
          다시 얼리버드 되기
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;
