const { DateTime } = require("luxon");

// Define two dates
const date1 = DateTime.fromISO("2024-07-09T12:00:00Z");
const date2 = DateTime.fromISO("2024-07-15T15:30:00Z");

// Calculate the difference
const diff = date2.diff(date1, ['days', 'hours', 'minutes']);

// Output the results
console.log("Difference: ", diff.toObject());
