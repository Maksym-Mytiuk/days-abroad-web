import { SECOND, MINUTE, HOUR, DAY, getDifferenceInDays } from '@/common/utils/date';

describe('Time utilities', () => {
  it('should define constants correctly', () => {
    expect(SECOND).toBe(1000);
    expect(MINUTE).toBe(60000);
    expect(HOUR).toBe(3600000);
    expect(DAY).toBe(86400000);
  });

  describe('getDifferenceInDays', () => {
    it('should return correct difference in days', () => {
      const startDate = '2022-01-01';
      const endDate = '2022-01-03';
      const difference = getDifferenceInDays(startDate, endDate);
      expect(difference).toBe(2);
    });

    it('should use current date as default end date', () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 3);
      const difference = getDifferenceInDays(startDate.toString());
      expect(difference).toBe(3);
    });
  });
});
