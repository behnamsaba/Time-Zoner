// calendar-converters.ts
import jalaali from 'jalaali-js';
import HijriDate from 'hijri-date';
import { PersianDate, ArabicDate } from './calender-types';

/**
 * Converts a Persian (Jalaali) date to an Arabic (Hijri) date.
 * 
 * @param persianDate - The Persian date to convert.
 * @returns The corresponding Arabic (Hijri) date.
 */
export function convertPersianToArabic(persianDate: PersianDate): ArabicDate {
    // Step 1: Convert Persian to Gregorian
    const { gy, gm, gd } = jalaali.toGregorian(persianDate.year, persianDate.month, persianDate.day);
    
    // Step 2: Convert Gregorian to Hijri (Arabic) using hijri-date
    const gregorianDate = new Date(gy, gm - 1, gd); // JavaScript Date months are 0-based
    const hijriDate = new HijriDate(gregorianDate);
    
    return {
        year: hijriDate.getFullYear(),
        month: hijriDate.getMonth() + 1, // hijri-date months are 0-based
        day: hijriDate.getDate(),
    };
}

/**
 * Converts an Arabic (Hijri) date to a Persian (Jalaali) date.
 * 
 * @param arabicDate - The Arabic (Hijri) date to convert.
 * @returns The corresponding Persian (Jalaali) date.
 */
export function convertArabicToPersian(arabicDate: ArabicDate): PersianDate {
    // Step 1: Convert Hijri (Arabic) to Gregorian using hijri-date
    const hijriDate = new HijriDate(arabicDate.year, arabicDate.month - 1, arabicDate.day); // months are 0-based
    const gregorianDate = hijriDate.toGregorian(); // Returns a JavaScript Date object
    
    // Step 2: Convert Gregorian to Persian
    const { jy, jm, jd } = jalaali.toJalaali(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate());
    
    return {
        year: jy,
        month: jm,
        day: jd,
    };
}
