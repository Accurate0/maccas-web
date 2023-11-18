export const truncate = (s: string, length: number) =>
  s.length > length ? `${s.substring(0, length - 3)}...` : s;
