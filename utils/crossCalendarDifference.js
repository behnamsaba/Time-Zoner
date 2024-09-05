const { DateTime } = require("luxon");

// Define a Gregorian date
const gregorianDate = DateTime.fromISO("2024-07-15T15:30:00Z");

// Define a Hebrew date and convert it to Gregorian for calculation
const hebrewDate = DateTime.fromISO("2024-07-01T12:00:00Z").reconfigure({ outputCalendar: 'hebrew' });
const convertedHebrewDate = DateTime.fromISO(hebrewDate.toISO());

// Calculate the difference
const diff = gregorianDate.diff(convertedHebrewDate, ['days', 'hours', 'minutes']);

// Output the results
console.log("Difference: ", diff.toObject());
