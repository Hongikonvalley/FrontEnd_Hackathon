export default function FilterButton({
  iconOnly = false,
  isrc,
  label,
  selected = false,
  onClick,
  disabled = false,
  design = '',
}) {
  const base =
    'flex items-center justify-center rounded-[20px] border border-transparent font-semibold ' +
    (selected ? 'bg-secondary text-white' : 'bg-white') +
    ' ' +
    (disabled ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer') +
    ' focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${design} + ${iconOnly ? '' : 'px-[7px] py-[1px] text-[12px]' + ' ' + base}`}
    >
      {iconOnly ? (
        <div>
          <span className="grid place-items-center flex-col p-[2px] overflow-hidden bg-primary rounded-[20px]">
            <img
              src={isrc}
              alt={label}
              className="pt-[5px] block w-full h-full aspect-square object-contain"
            />
          </span>
          <p className="text-[12px] mt-[4px]">{label}</p>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
