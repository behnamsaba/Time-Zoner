import { DateTime } from "luxon";

interface CalendarInput {
  year: number;
  month: number;
  day: number;
  calendarType: string;
}

interface CalendarOutput {
  [key: string]: string;
}

const calendars = [
  { name: "Gregorian", code: "gregory", locale: "en-US" },
  { name: "Buddhist", code: "buddhist", locale: "th-TH" },
  { name: "Chinese", code: "chinese", locale: "zh-CN" },
  { name: "Coptic", code: "coptic", locale: "cop-EG" },
  { name: "Ethiopic", code: "ethiopic", locale: "am-ET" },
  { name: "Hebrew", code: "hebrew", locale: "he-IL" },
  { name: "Indian", code: "indian", locale: "hi-IN" },
  { name: "Islamic", code: "islamic", locale: "ar-SA" },
  { name: "Japanese", code: "japanese", locale: "ja-JP" },
  { name: "Persian", code: "persian", locale: "fa-IR" },
  { name: "ROC", code: "roc", locale: "zh-TW" }
];

export function calculateCalendar(input: CalendarInput): CalendarOutput {
  const { year, month, day, calendarType } = input;

  // Create a DateTime object from the input
  const inputDate = DateTime.local(year, month, day, { zone: 'utc' });

  const results: CalendarOutput = {};

  // Convert to all supported calendars
  calendars.forEach(({ name, code, locale }) => {
    try {
      const dateInCalendar = inputDate.reconfigure({ 
        locale: `${locale}-u-ca-${code}`
      });
      
      const formattedDate = dateInCalendar.toLocaleString({
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }, { locale: locale });  // Pass locale as a separate option

      results[name] = formattedDate;
    } catch (error) {
      console.error(`Error converting to ${name} calendar:`, error);
      results[name] = 'Conversion error';
    }
  });

  return results;
}