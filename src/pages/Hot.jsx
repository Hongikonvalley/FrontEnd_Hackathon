import Header from '../components/Header';
import StoreCard from '../components/StoreCard';
import { stores } from '../data/mockStores';

const Hot = () => {
  return (
    <>
      <Header showBack={true} />
      <div className="text-[18px] font-black flex flex-row justify-center mx-[16px]">
        <div>오늘의</div>
        <div className="text-secondary">&nbsp;HOT</div>
        <div>&nbsp;모닝세일</div>
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </>
  );
};

export default Hot;
