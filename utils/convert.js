const { DateTime } = require("luxon");

const dt = DateTime.now()



// console.log(dt.zoneName)
// console.log(dt.toLocaleString())
// console.log(dt.toLocaleString(DateTime.DATETIME_MED))
// console.log(dt.plus({ hours: 3, minutes: 2 }).toLocaleString(DateTime.DATETIME_MED))
// console.log(dt.startOf('day'))

// var dt2 = DateTime.fromISO("2017-09-24", { locale: "fr" });
// console.log(dt2.toLocaleString(DateTime.DATETIME_MED))


// const ben = DateTime.now()
//   .setLocale("el")
//   .toLocaleString(DateTime.DATE_FULL);

//   console.log(ben)

var local = DateTime.now().plus({ hours: 3, minutes: 2 });
var rezoned = local.setZone("Asia/Tehran");
console.log(rezoned.toLocaleString(DateTime.DATETIME_HUGE))

console.log(DateTime.fromISO('2017-W23-3').plus({ year: 2, weeks: 1, days: 2 }).toISOWeekDate())