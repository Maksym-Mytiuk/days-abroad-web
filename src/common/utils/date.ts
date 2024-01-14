export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function getDifferenceInDays(startDate: string, endDate = new Date().toString()) {
  const differenceInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.floor(differenceInTime / DAY);
}
