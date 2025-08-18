import Header from '../components/Header';

const Setting = () => {
  return (
    <div>
      <Header title="setting" showBack={true} />
      <div className="m-[12px] p-[8px] h-full">
        {/* 알림 */}
        <div className="font-bold py-[5px]">알림</div>
        <div className="border-1 border-b border-[#EBEBEB]" />
        <label class="inline-flex py-[5px] items-center cursor-pointer justify-between w-full">
          <div>쿠폰 알림</div>
          <input type="checkbox" value="" class="sr-only peer" />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-amber-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
        </label>
        <label class="inline-flex py-[5px] items-center cursor-pointer justify-between w-full">
          <div>오픈 알림</div>
          <input type="checkbox" value="" class="sr-only peer" />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-amber-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
        </label>

        <div className="h-[90px] bg-transparent" />

        {/* 계정 */}
        <div className="font-bold py-[8px]">계정</div>
        <div className="border-1 border-b border-[#EBEBEB]" />
        <div className="flex justify-between py-[5px]">
          <div className="">내 정보</div>
          <div>정보</div>
        </div>
        <div className="py-[5px]">탈퇴하기</div>

        <div className="h-[90px] bg-transparent" />

        {/* 정보 */}
        <div className="font-bold py-[8px]">정보</div>
        <div className="border-1 border-b border-[#EBEBEB]" />
        <div className="justify-between flex py-[5px]">
          <div>버전 정보</div>
          <div>v.어쩌고</div>
        </div>
        <div className="py-[5px]">개인정보 처리방침</div>
      </div>
    </div>
  );
};

export default Setting;
