// app/utils/calendarConversions.ts

import jalaali from 'jalaali-js';
import {
  toJewishDate,
  toGregorianDate,
  JewishMonth,
} from 'jewish-date';

export interface PersianDate {
  year: number;
  month: number;
  day: number;
}

export interface HebrewDate {
  year: number;
  month: typeof JewishMonth[keyof typeof JewishMonth];
  day: number;
}

/**
 * Converts a Persian (Jalaali) date to a Hebrew (Jewish) date.
 * @param persianDate - The Persian date to convert.
 * @returns The corresponding Hebrew date or null if conversion fails.
 */
export function convertPersianToHebrew(persianDate: PersianDate): HebrewDate | null {
  try {
    // Step 1: Convert Persian to Gregorian using jalaali-js
    const gregorian = jalaali.toGregorian(persianDate.year, persianDate.month, persianDate.day);

    // Create a JavaScript Date object (months are 0-based)
    const gregorianDate = new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);

    // Step 2: Convert Gregorian to Hebrew using jewish-date
    const jewishDate = toJewishDate(gregorianDate);

    if (!jewishDate) {
      throw new Error('Conversion to Jewish date failed.');
    }

    // Parse the Jewish date object returned by toJewishDate
    const hebrewDate: HebrewDate = {
      year: jewishDate.year,
      month: jewishDate.monthName as typeof JewishMonth[keyof typeof JewishMonth],
      day: jewishDate.day,
    };

    return hebrewDate;
  } catch (error) {
    console.error('Error converting Persian to Hebrew:', error);
    return null;
  }
}

/**
 * Converts a Hebrew (Jewish) date to a Persian (Jalaali) date.
 * @param hebrewDate - The Hebrew date to convert.
 * @returns The corresponding Persian date or null if conversion fails.
 */
export function convertHebrewToPersian(hebrewDate: HebrewDate): PersianDate | null {
  try {
    // Step 1: Convert Hebrew to Gregorian using jewish-date
    const gregorianDate = toGregorianDate({
      year: hebrewDate.year,
      monthName: hebrewDate.month,
      day: hebrewDate.day,
    });

    if (!gregorianDate) {
      throw new Error('Conversion to Gregorian date failed.');
    }

    // Step 2: Convert Gregorian to Persian using jalaali-js
    const persian = jalaali.toJalaali(
      gregorianDate.getFullYear(),
      gregorianDate.getMonth() + 1, // JavaScript months are 0-based
      gregorianDate.getDate()
    );

    if (!persian) {
      throw new Error('Conversion to Persian date failed.');
    }

    const persianDate: PersianDate = {
      year: persian.jy,
      month: persian.jm,
      day: persian.jd,
    };

    return persianDate;
  } catch (error) {
    console.error('Error converting Hebrew to Persian:', error);
    return null;
  }
}

export { JewishMonth };
