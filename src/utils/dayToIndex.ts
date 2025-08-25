const KOR_DAYS_ORDER = ['월', '화', '수', '목', '금', '토', '일'];

export function dayToIndex(label?: string) {
  if (!label) return undefined;
  const i = KOR_DAYS_ORDER.indexOf(label);
  return i >= 0 ? i : undefined;
}
