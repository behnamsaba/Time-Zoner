// dateCalculations.ts
import { DateTime } from 'luxon';

interface DateDifference {
    years: number;
    months: number;
    weeks: number;
    days: number;
}

export const calculateDateDifference = (startDate: string, endDate: string): DateDifference => {
    const date1 = DateTime.fromISO(startDate);
    const date2 = DateTime.fromISO(endDate);
    const earlierDate = date1 < date2 ? date1 : date2;
    const laterDate = date1 >= date2 ? date1 : date2;
    const diff = laterDate.diff(earlierDate, ['years', 'months', 'days']).toObject();
    const weeks = Math.floor((diff.days ?? 0) / 7);
    const days = (diff.days ?? 0) % 7;
    return {
        years: diff.years ?? 0,
        months: diff.months ?? 0,
        weeks,
        days
    };
};
