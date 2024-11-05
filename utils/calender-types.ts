import
{ JewishMonth } from 'jewish-date';

export interface HebrewDate
{
    year: number;
    month: typeof JewishMonth[ keyof typeof JewishMonth ];
    day: number;
}

export interface ChineseDate
{
    cycle: number;
    year: number;
    month: ChineseMonth;
    day: number;
    leap: number | boolean
}

export interface PersianDate
{
    year: number;
    month: number;
    day: number;
}

export interface ArabicDate
{
    year: number;
    month: number; // 1-12
    day: number;
}


export const gregorianMonthItems = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
];

export const calendarTypes = [
    'Gregorian',
    'Julian',
    'Islamic',
    'Hebrew',
    'Persian',
    'Chinese',
];

export enum ChineseMonth
{
    YiYue = '一月',
    ErYue = '二月',
    SanYue = '三月',
    SiYue = '四月',
    WuYue = '五月',
    LiuYue = '六月',
    QiYue = '七月',
    BaYue = '八月',
    JiuYue = '九月',
    ShiYue = '十月',
    ShiYiYue = '十一月',
    ShiErYue = '十二月',
    RunShiErYue = '闰十二月', // Leap twelfth month
}

export const hebrewMonthItems: Array<{ label: string; value: typeof JewishMonth[ keyof typeof JewishMonth ] }> = [
    { label: 'Nisan', value: JewishMonth.Nisan },
    { label: 'Iyar', value: JewishMonth.Iyyar },
    { label: 'Sivan', value: JewishMonth.Sivan },
    { label: 'Tammuz', value: JewishMonth.Tammuz },
    { label: 'Av', value: JewishMonth.Av },
    { label: 'Elul', value: JewishMonth.Elul },
    { label: 'Tishrei', value: JewishMonth.Tishri },
    { label: 'Cheshvan', value: JewishMonth.Cheshvan },
    { label: 'Kislev', value: JewishMonth.Kislev },
    { label: 'Tevet', value: JewishMonth.Tevet },
    { label: 'Shevat', value: JewishMonth.Shevat },
    { label: 'Adar I', value: JewishMonth.AdarI },
    { label: 'Adar II', value: JewishMonth.AdarII },
];


export const persianMonthItems = [
    { label: 'Farvardin', value: '01' },
    { label: 'Ordibehesht', value: '02' },
    { label: 'Khordad', value: '03' },
    { label: 'Tir', value: '04' },
    { label: 'Mordad', value: '05' },
    { label: 'Shahrivar', value: '06' },
    { label: 'Mehr', value: '07' },
    { label: 'Aban', value: '08' },
    { label: 'Azar', value: '09' },
    { label: 'Dey', value: '10' },
    { label: 'Bahman', value: '11' },
    { label: 'Esfand', value: '12' },
];

export const arabicMonthItems = [
    { label: 'محرم', value: '01' },
    { label: 'صفر', value: '02' },
    { label: 'ربيع الأول', value: '03' },
    { label: 'ربيع الثاني', value: '04' },
    { label: 'جمادى الأولى', value: '05' },
    { label: 'جمادى الآخرة', value: '06' },
    { label: 'رجب', value: '07' },
    { label: 'شعبان', value: '08' },
    { label: 'رمضان', value: '09' },
    { label: 'شوال', value: '10' },
    { label: 'ذو القعدة', value: '11' },
    { label: 'ذو الحجة', value: '12' },
];

export const chineseMonthItems: Array<{ label: string; value: ChineseMonth }> = [
    { label: '一月', value: ChineseMonth.YiYue },
    { label: '二月', value: ChineseMonth.ErYue },
    { label: '三月', value: ChineseMonth.SanYue },
    { label: '四月', value: ChineseMonth.SiYue },
    { label: '五月', value: ChineseMonth.WuYue },
    { label: '六月', value: ChineseMonth.LiuYue },
    { label: '七月', value: ChineseMonth.QiYue },
    { label: '八月', value: ChineseMonth.BaYue },
    { label: '九月', value: ChineseMonth.JiuYue },
    { label: '十月', value: ChineseMonth.ShiYue },
    { label: '十一月', value: ChineseMonth.ShiYiYue },
    { label: '十二月', value: ChineseMonth.ShiErYue },
    { label: '闰十二月', value: ChineseMonth.RunShiErYue }, // Leap twelfth month
];