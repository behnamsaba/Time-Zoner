// calendar-converters.ts

import jalaali from 'jalaali-js';
import HijriDate from 'hijri-date';
import
  {
    toJewishDate,
    toGregorianDate,
    JewishMonth,
  } from 'jewish-date';
import { CalendarChinese } from 'date-chinese';
import
  {
    HebrewDate,
    ChineseDate,
    ChineseMonth,
    PersianDate,
    ArabicDate,
    CalendarDate,
  } from './calender-types';
import { DateTime } from 'luxon';

/**
 * Enum representing supported calendar types.
 */
export enum CalendarType
{
  Gregorian = 'Gregorian',
  Persian = 'Persian',
  Arabic = 'Arabic',
  Hebrew = 'Hebrew',
  Chinese = 'Chinese'
}

/**
 * CalendarConverter
 * 
 * A class that provides methods to convert dates between various calendar systems:
 * Gregorian, Persian (Jalaali), Arabic (Hijri), Hebrew (Jewish), and Chinese Lunar.
 * 
 * This implementation minimizes code duplication by centralizing conversions
 * through the Gregorian calendar as an intermediary.
 */
export class CalendarConverter
{
  /**
   * Converts a date from a source calendar to a target calendar.
   * @param sourceCalendar The source calendar type.
   * @param targetCalendar The target calendar type.
   * @param date The date object in the source calendar.
   * @returns The converted date object in the target calendar or null if conversion fails.
   */
  public convert (
    sourceCalendar: CalendarType,
    targetCalendar: CalendarType,
    date: CalendarDate
  ): CalendarDate | null
  {
    try
    {
      // Step 1: Convert source calendar to Gregorian
      const gregorianDate = this.convertToGregorian( sourceCalendar, date );
      if ( !gregorianDate )
      {
        console.error( `Conversion from ${ sourceCalendar } to Gregorian failed.` );
        return null;
      }

      // Step 2: Convert Gregorian to target calendar
      const targetDate = this.convertFromGregorian( targetCalendar, gregorianDate );
      if ( !targetDate )
      {
        console.error( `Conversion from Gregorian to ${ targetCalendar } failed.` );
        return null;
      }

      return targetDate;
    } catch ( error )
    {
      console.error( `Error converting from ${ sourceCalendar } to ${ targetCalendar }:`, error );
      return null;
    }
  }

  /**
   * Converts a source calendar date to a Gregorian Date object.
   * @param sourceCalendar The source calendar type.
   * @param date The date object in the source calendar.
   * @returns A JavaScript Date object representing the Gregorian date or null if conversion fails.
   */
  private convertToGregorian (
    sourceCalendar: CalendarType,
    date: CalendarDate
  ): Date | null
  {
    switch ( sourceCalendar )
    {
      case CalendarType.Gregorian:
        return date instanceof Date ? date : null;

      case CalendarType.Persian:
        return this.persianToGregorian( date as PersianDate );

      case CalendarType.Arabic:
        return this.arabicToGregorian( date as ArabicDate );

      case CalendarType.Hebrew:
        return this.hebrewToGregorian( date as HebrewDate );

      case CalendarType.Chinese:
        return this.chineseToGregorian( date as ChineseDate );

      default:
        console.error( `Unsupported source calendar: ${ sourceCalendar }` );
        return null;
    }
  }

  /**
   * Converts a Gregorian Date object to a target calendar date.
   * @param targetCalendar The target calendar type.
   * @param date The Gregorian Date object.
   * @returns The date object in the target calendar or null if conversion fails.
   */
  private convertFromGregorian (
    targetCalendar: CalendarType,
    date: Date
  ): CalendarDate | null
  {
    switch ( targetCalendar )
    {
      case CalendarType.Gregorian:
        return date;

      case CalendarType.Persian:
        return this.gregorianToPersian( date );

      case CalendarType.Arabic:
        return this.gregorianToArabic( date );

      case CalendarType.Hebrew:
        return this.gregorianToHebrew( date );

      case CalendarType.Chinese:
        return this.gregorianToChinese( date );

      default:
        console.error( `Unsupported target calendar: ${ targetCalendar }` );
        return null;
    }
  }

  /**
   * Converts a Persian (Jalaali) date to a Gregorian Date object.
   * @param persianDate The Persian date to convert.
   * @returns The corresponding Gregorian Date object or null if conversion fails.
   */
  private persianToGregorian ( persianDate: PersianDate ): Date | null
  {
    try
    {
      const { gy, gm, gd } = jalaali.toGregorian( persianDate.year, persianDate.month, persianDate.day );
      return new Date( gy, gm - 1, gd );
    } catch ( error )
    {
      console.error( 'Error converting Persian to Gregorian:', error );
      return null;
    }
  }

  /**
   * Converts a Gregorian Date object to a Persian (Jalaali) date.
   * @param gregorianDate The Gregorian Date object.
   * @returns The corresponding Persian date or null if conversion fails.
   */
  private gregorianToPersian ( gregorianDate: Date ): PersianDate | null
  {
    try
    {
      const { jy, jm, jd } = jalaali.toJalaali(
        gregorianDate.getFullYear(),
        gregorianDate.getMonth() + 1,
        gregorianDate.getDate()
      );
      return { year: jy, month: jm, day: jd };
    } catch ( error )
    {
      console.error( 'Error converting Gregorian to Persian:', error );
      return null;
    }
  }

  /**
   * Converts an Arabic (Hijri) date to a Gregorian Date object.
   * @param arabicDate The Arabic (Hijri) date to convert.
   * @returns The corresponding Gregorian Date object or null if conversion fails.
   */
  private arabicToGregorian ( arabicDate: ArabicDate ): Date | null
  {
    try
    {
      const hijriDate = new HijriDate( arabicDate.year, arabicDate.month - 1, arabicDate.day );
      return hijriDate.toGregorian();
    } catch ( error )
    {
      console.error( 'Error converting Arabic to Gregorian:', error );
      return null;
    }
  }

  /**
   * Converts a Gregorian Date object to an Arabic (Hijri) date.
   * @param gregorianDate The Gregorian Date object.
   * @returns The corresponding Arabic (Hijri) date or null if conversion fails.
   */
  private gregorianToArabic ( gregorianDate: Date ): ArabicDate | null
  {
    try
    {
      const hijriDate = new HijriDate( gregorianDate );
      return {
        year: hijriDate.getFullYear(),
        month: hijriDate.getMonth() + 1, // hijri-date months are 0-based
        day: hijriDate.getDate(),
      };
    } catch ( error )
    {
      console.error( 'Error converting Gregorian to Arabic:', error );
      return null;
    }
  }

  /**
   * Converts a Hebrew (Jewish) date to a Gregorian Date object.
   * @param hebrewDate The Hebrew date to convert.
   * @returns The corresponding Gregorian Date object or null if conversion fails.
   */
  private hebrewToGregorian ( hebrewDate: HebrewDate ): Date | null
  {
    try
    {
      const gregorianDate = toGregorianDate( {
        year: hebrewDate.year,
        monthName: hebrewDate.month,
        day: hebrewDate.day,
      } );
      return gregorianDate;
    } catch ( error )
    {
      console.error( 'Error converting Hebrew to Gregorian:', error );
      return null;
    }
  }

  /**
   * Converts a Gregorian Date object to a Hebrew (Jewish) date.
   * @param gregorianDate The Gregorian Date object.
   * @returns The corresponding Hebrew (Jewish) date or null if conversion fails.
   */
  private gregorianToHebrew ( gregorianDate: Date ): HebrewDate | null
  {
    try
    {
      const jewishDate = toJewishDate( gregorianDate );
      if ( !jewishDate )
      {
        throw new Error( 'Conversion to Jewish date failed.' );
      }

      const hebrewMonth = jewishDate.monthName as typeof JewishMonth[ keyof typeof JewishMonth ];
      if ( !Object.values( JewishMonth ).includes( hebrewMonth ) )
      {
        throw new Error( `Invalid Hebrew month name received: ${ jewishDate.monthName }` );
      }

      return {
        year: jewishDate.year,
        month: hebrewMonth,
        day: jewishDate.day,
      };
    } catch ( error )
    {
      console.error( 'Error converting Gregorian to Hebrew:', error );
      return null;
    }
  }
  /**
   * Converts a Chinese lunar date to a Gregorian Date object.
   * @param chineseDate The Chinese lunar date to convert.
   * @returns The corresponding Gregorian Date object or null if conversion fails.
   */
  private chineseToGregorian ( chineseDate: ChineseDate ): Date | null
  {
    try
    {
      const { cycle, year, month, leap, day } = chineseDate;
      const chineseMonthNumber = this.mapChineseMonthToNumber( month );
      const chineseLeapNumber = leap ? 1 : 0;

      const cal = new CalendarChinese(
        cycle,
        year,
        chineseMonthNumber,
        chineseLeapNumber,
        day
      );

      const gregorianDateObj = ( cal.toGregorian as () => { year: number; month: number; day: number } | null )();
      if ( !gregorianDateObj )
      {
        throw new Error( 'Conversion to Gregorian date failed.' );
      }

      return new Date( gregorianDateObj.year, gregorianDateObj.month - 1, gregorianDateObj.day );
    } catch ( error )
    {
      console.error( 'Error converting Chinese to Gregorian:', error );
      return null;
    }
  }

  /**
   * Converts a Gregorian Date object to a Chinese lunar date.
   * @param gregorianDate The Gregorian Date object.
   * @returns The corresponding Chinese lunar date or null if conversion fails.
   */
  private gregorianToChinese ( gregorianDate: Date ): ChineseDate | null
  {
    try
    {
      const cal = new CalendarChinese();
      cal.fromGregorian(
        gregorianDate.getFullYear(),
        gregorianDate.getMonth() + 1,
        gregorianDate.getDate()
      );

      const [ cycle, year, month, leapNumber, day ] = cal.get();
      const leap = leapNumber === 1;
      const chineseMonth: ChineseMonth = this.mapNumberToChineseMonth( month );

      return {
        cycle,
        year,
        month: chineseMonth,
        day,
        leap,
      };
    } catch ( error )
    {
      console.error( 'Error converting Gregorian to Chinese:', error );
      return null;
    }
  }

  /**
   * Helper function to map numeric month to ChineseMonth enum.
   * @param monthNumber Numeric month (1-13)
   * @returns Corresponding ChineseMonth enum value
   */
  private mapNumberToChineseMonth ( monthNumber: number ): ChineseMonth
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
  }

  /**
   * Helper function to map ChineseMonth enum to numeric month.
   * @param month ChineseMonth enum value
   * @returns Numeric month (1-13)
   */
  private mapChineseMonthToNumber ( month: ChineseMonth ): number
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
  }
}
