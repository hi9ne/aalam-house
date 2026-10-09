/** Разряды разделяются неразрывным пробелом, чтобы сумма не переносилась по частям. */
export function formatUsd(amount: number) {
  const digits = String(Math.round(amount)).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " ",
  );
  return `$${digits}`;
}

export function pluralize(n: number, [one, few, many]: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
