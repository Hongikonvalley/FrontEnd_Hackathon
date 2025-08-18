export default function FilterButton({ label, selected, onClick, disabled }) {
  return (
    <button
      className={[
        'px-[7px] py-[1px] w-fit h-fit rounded-[20px] flex justify-center content-center items-center text-[12px]',
        selected ? 'bg-secondary text-white' : 'bg-white',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-black',
      ].join(' ')}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
