// types/hijri-date.d.ts
declare module 'hijri-date' {
    export default class HijriDate {
        constructor(year?: number, month?: number, day?: number);
        constructor(date: Date);

        getFullYear(): number;
        getMonth(): number; // 0-based
        getDate(): number;

        toGregorian(): Date;
    }
}
