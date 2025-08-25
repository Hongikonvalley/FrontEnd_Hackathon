export default function FilterButton({
  iconOnly = false,
  isrc,
  label,
  selected = false,
  onClick,
  disabled = false,
  design = '',
  dimInactive = false,
  type = '',
}) {
  const base =
    'inline-flex select-none items-center justify-center rounded-2xl text-[12px] font-semibold ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 transition';

  const state =
    (disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer hover:shadow-sm active:scale-[0.98]') +
    ' ' +
    (selected ? 'bg-primary text-white ' : 'bg-white text-gray-900 ');

  const dimClass = dimInactive && selected === false ? ' opacity-50' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${state}  ${iconOnly ? '' : 'px-[7px] py-[1px] text-[12px] '} ${design}`}
    >
      {iconOnly ? (
        <div>
          <span
            className={`grid place-items-center flex-col mx-[12px] my-[6px] p-[2px] overflow-hidden bg-primary rounded-[20px] ${design} ${dimClass}`}
          >
            <img
              src={isrc}
              alt={label}
              className={`pt-[5px] block aspect-square object-contain `}
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
