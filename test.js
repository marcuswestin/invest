require('./util')

var start = 10
var monthly = 0.486778 // percent
var annual = 6 // percent
var years = 200
var reportEvery = 5

var monthlySum = start
var annualSum = start
var year = 0

while (year < years) {
	for (var month=0; month<12; month++) {
		monthlySum *= (1+monthly/100)
	}
	annualSum *= (1+annual/100)
	year += 1
	console.log('Monthly:', money(monthlySum), '\tAnnual:', money(annualSum))
}