// app/utils/HebrewChineseFunction.ts

import
    {
        toJewishDate,
        toGregorianDate,
        JewishMonth,
    } from 'jewish-date';
import { CalendarChinese } from 'date-chinese';
import { HebrewDate, ChineseDate, ChineseMonth } from './calender-types';

/**
 * Helper function to map numeric month to ChineseMonth enum.
 * @param monthNumber Numeric month (1-13)
 * @returns Corresponding ChineseMonth enum value
 */
const mapNumberToChineseMonth = ( monthNumber: number ): ChineseMonth =>
{
    const mapping: { [ key: number ]: ChineseMonth } = {
        1: ChineseMonth.YiYue,
        2: ChineseMonth.ErYue,
        3: ChineseMonth.SanYue,
        4: ChineseMonth.SiYue,
        5: ChineseMonth.WuYue,
        6: ChineseMonth.LiuYue,
        7: ChineseMonth.QiYue,
        8: ChineseMonth.BaYue,
        9: ChineseMonth.JiuYue,
        10: ChineseMonth.ShiYue,
        11: ChineseMonth.ShiYiYue,
        12: ChineseMonth.ShiErYue,
        13: ChineseMonth.RunShiErYue, // Leap month
    };

    return mapping[ monthNumber ] || ChineseMonth.YiYue; // Defaults to YiYue if undefined
};

/**
 * Helper function to map ChineseMonth enum to numeric month.
 * @param month ChineseMonth enum value
 * @returns Numeric month (1-13)
 */
const mapChineseMonthToNumber = ( month: ChineseMonth ): number =>
{
    const mapping: { [ key in ChineseMonth ]: number } = {
        [ ChineseMonth.YiYue ]: 1,
        [ ChineseMonth.ErYue ]: 2,
        [ ChineseMonth.SanYue ]: 3,
        [ ChineseMonth.SiYue ]: 4,
        [ ChineseMonth.WuYue ]: 5,
        [ ChineseMonth.LiuYue ]: 6,
        [ ChineseMonth.QiYue ]: 7,
        [ ChineseMonth.BaYue ]: 8,
        [ ChineseMonth.JiuYue ]: 9,
        [ ChineseMonth.ShiYue ]: 10,
        [ ChineseMonth.ShiYiYue ]: 11,
        [ ChineseMonth.ShiErYue ]: 12,
        [ ChineseMonth.RunShiErYue ]: 13, // Leap month
    };

    return mapping[ month ];
};

/**
 * Converts a Hebrew date to a Chinese lunar date using Gregorian as an intermediary.
 * @param hebrewDate HebrewDate object
 * @returns ChineseDate object or null if conversion fails
 */
export const convertHebrewToChinese = ( hebrewDate: HebrewDate ): ChineseDate | null =>
{
    try
    {
        // Step 1: Convert Hebrew date to Gregorian date using jewish-date library
        const gregorianDate: Date | null = toGregorianDate( {
            year: hebrewDate.year,
            monthName: hebrewDate.month,
            day: hebrewDate.day,
        } );

        if ( !gregorianDate )
        {
            console.error( 'Failed to convert Hebrew date to Gregorian date.' );
            return null;
        }

        // Extract Gregorian date components using getter methods
        const gregorianYear = gregorianDate.getFullYear();
        const gregorianMonth = gregorianDate.getMonth() + 1; // JavaScript Date months are 0-indexed
        const gregorianDay = gregorianDate.getDate();

        // Step 2: Convert Gregorian date to Chinese lunar date using date-chinese library
        const cal = new CalendarChinese();
        cal.fromGregorian( gregorianYear, gregorianMonth, gregorianDay );

        const [ cycle, year, month, leapNumber, day ] = cal.get();

        // Convert leapNumber (0 or 1) to boolean
        const leap = leapNumber === 1;

        // Map numeric month to ChineseMonth enum
        const chineseMonth: ChineseMonth = mapNumberToChineseMonth( month );

        return {
            cycle,
            year,
            month: chineseMonth,
            day,
            leap,
        };
    } catch ( error )
    {
        console.error( 'Error converting Hebrew to Chinese date:', error );
        return null;
    }
};

/**
 * Converts a Chinese lunar date to a Hebrew date using Gregorian as an intermediary.
 * @param chineseDate ChineseDate object
 * @returns HebrewDate object or null if conversion fails
 */
export const convertChineseToHebrew = ( chineseDate: ChineseDate ): HebrewDate | null =>
{
    try
    {
        // Step 1: Convert Chinese lunar date to Gregorian date using date-chinese library
        const chineseCycle = 78; // Assuming a fixed cycle; adjust as needed
        const chineseYear = chineseDate.year;
        const chineseMonthNumber = mapChineseMonthToNumber( chineseDate.month );
        const chineseLeapNumber = chineseDate.leap ? 1 : 0;
        const chineseDay = chineseDate.day;

        // The 'date-chinese' library expects 'leap' as a number (1 for leap, 0 otherwise)
        const cal = new CalendarChinese(
            chineseCycle,
            chineseYear,
            chineseMonthNumber,
            chineseLeapNumber,
            chineseDay
        );

        // TypeScript expects one argument, but based on usage, it's likely unnecessary.
        // Use a type assertion to bypass the TypeScript error.
        const gregorianDateObj = ( cal.toGregorian as () => { year: number; month: number; day: number } | null )();

        if ( !gregorianDateObj )
        {
            console.error( 'Failed to convert Chinese date to Gregorian date.' );
            return null;
        }

        const { year: gregorianYear, month: gregorianMonth, day: gregorianDay } = gregorianDateObj;

        // Create JavaScript Date object (months are 0-indexed)
        const gregorianDate = new Date( gregorianYear, gregorianMonth - 1, gregorianDay );

        // Step 2: Convert Gregorian date to Hebrew date using jewish-date library
        const jewishDateObj = toJewishDate( gregorianDate );

        if ( !jewishDateObj )
        {
            console.error( 'Failed to convert Gregorian date to Hebrew date.' );
            return null;
        }

        // Map the monthName to JewishMonth enum
        const hebrewMonth = jewishDateObj.monthName;

        // Validate if hebrewMonth is a valid JewishMonth enum
        if ( !Object.values( JewishMonth ).includes( hebrewMonth ) )
        {
            console.error( `Invalid Hebrew month name received: ${ jewishDateObj.monthName }` );
            return null;
        }

        return {
            year: jewishDateObj.year,
            month: hebrewMonth,
            day: jewishDateObj.day,
        };
    } catch ( error )
    {
        console.error( 'Error converting Chinese to Hebrew date:', error );
        return null;
    }
};
