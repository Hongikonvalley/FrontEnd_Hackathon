const FilteredList = ({ filtering, onClick }) => {
  return (
    <>
      <div
        className="bg-primary text-white text-[12px] rounded-[20px] w-fit
     p-[4px] px-[8px] flex flex-row items-center justify-between gap-[2px] content-center"
      >
        <div className="text-[12px] font-medium"> {filtering}</div>
        <div className="w-[20px] aspect-square">
          <img
            src="./multiply.svg"
            className="object-cover invert"
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
};

export default FilteredList;
