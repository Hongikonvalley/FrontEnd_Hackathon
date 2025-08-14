import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
const Favorite = () => {
  return (
    <div>
      <Header title="fav" showBack={true} />
      <FavoriteCard />
      {/* body */}
      <div className="flex flex-col relative items-center justify-center text-center p-4">
        <div className="absolute top-2/5">
          <div className="text-[24px]">more;ing</div>
          <div>
            더 많은 more;ing을 즐겨찾기 하고 <br></br>혜택을 받아보세요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
