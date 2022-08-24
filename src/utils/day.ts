export const fillZero = (num: number | string): string => {
  if (Number(num) < 10) {
    return "0" + num;
  }
  return `${num}`;
};

export const formatDate = (date: Record<string, number>) => {
  return `${date.$y}-${fillZero(date.$M + 1)}-${fillZero(date.$D)} ${fillZero(date.$H)}:${fillZero(
    date.$m
  )}:${fillZero(date.$s)}`;
};
