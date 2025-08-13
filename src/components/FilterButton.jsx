export default function FilterButton({ label, selected, onClick, disabled }) {
  return (
    <button
      className={[
        'p-2 w-fit h-[20px] rounded-[20px] flex justify-center items-center text-[12px]',
        selected ? 'bg-yellow-400 font-bold' : 'bg-white',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-black',
      ].join(' ')}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
