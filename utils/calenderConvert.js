const { DateTime } = require("luxon");

// Example ISO8601 date
const isoDate = "1993-02-02";

// Convert to DateTime object
const date = DateTime.fromISO(isoDate);

// Convert to Hebrew calendar
const hebrewDate = date.setLocale('he').reconfigure({ outputCalendar: 'hebrew' });
console.log("Hebrew Date:", hebrewDate.toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' }));

// Convert to Persian calendar
const persianDate = date.setLocale('fa-IR').reconfigure({ outputCalendar: 'persian' });
console.log("Persian Date:", persianDate.toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' }));


const calendars = [
  "gregory",
  "iso8601",
  "buddhist",
  "chinese",
  "coptic",
  "ethiopic",
  "ethioaa",
  "hebrew",
  "indian",
  "islamic",
  "japanese",
  "persian",
  "roc"
];

// Function to get the current time in all supported calendars
function getCurrentTimeInAllCalendars() {
  const now = DateTime.now();
  const results = {};

  calendars.forEach(calendar => {
    const dateInCalendar = now.reconfigure({ outputCalendar: calendar });
    results[calendar] = dateInCalendar.toLocaleString(DateTime.DATE_FULL);
  });

  return results;
}

console.log(getCurrentTimeInAllCalendars())