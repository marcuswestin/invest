require('./util')

var annualPercentages = {
	'8': 0.6434031,
	'6': 0.486778,
	'4': 0.32737,
	'2': 0.16515
}


var annualPercentage = 4
var monthlyGainPercent = annualPercentages[annualPercentage]
var monthlyIncome = 4000 // after tax
var monthlyCosts = 2300
var annualGainTax = 40 // percent

var investAccount = 50000
var checkingAccount = 0
var annualInvestPercent = 50 // percent of checking account to invest at end of year
var annualRaisePercent = 5 // percent
var stopWorkAfterYears = 35 // years to pension

var years = 40
var reportEvery = 5

log()
console.log('Simulation for', years, 'years of work,', 'starting with:',
	'\n\t', money(monthlyIncome*12)+' annual income after tax (or '+money(monthlyIncome)+' monthly paycheck)',
	'\n\t', money(monthlyCosts*12)+' annual costs (or '+money(monthlyCosts)+' per month)',
	'\n\t', money(investAccount)+' invested with ', annualPercentage+'% annual return',
	'\n\t', annualGainTax+'% annual capital gains tax',
	'\n\t', annualInvestPercent+'% of leftover checking invested each year',
	'\n============')

log('Year\tSalary\t\tChecking Acc\tInvest Acc\tInvest New\tNew Salary (raised)\tCapital Gains Tax')

for (var year=0; year<years; year++) {
	var startOfYearInvestment = investAccount

	for (var month = 0; month<12; month++) {
		iterateMonth()
	}
	iterateYear(year, startOfYearInvestment)
}

function iterateMonth() {
	checkingAccount += monthlyIncome
	checkingAccount -= monthlyCosts
	investAccount *= (1+monthlyGainPercent/100)
}

function iterateYear(year, startOfYearInvestment) {
	var investmentGain = investAccount - startOfYearInvestment
	var tax = investmentGain * annualGainTax/100
	
	var eoyIncome = money(monthlyIncome*12)
	var eoyCheckingAcc = money(checkingAccount)
	var eoyInvestAcc = money(investAccount)
	
	var raise = monthlyIncome * annualRaisePercent/100
	monthlyIncome += raise
	var investAmount = checkingAccount * annualInvestPercent / 100
	checkingAccount -= investAmount
	investAccount += investAmount
	investAccount -= tax

	var eoyInvestedAmount = money(investAmount)
	var eoyNewIncome = money(monthlyIncome * 12)
	var eoyRaise = money(raise * 12)

	if (year % reportEvery == 0) {
		log(year,
			eoyIncome, eoyCheckingAcc, eoyInvestAcc,
			eoyInvestedAmount, eoyNewIncome + '    ('+eoyRaise+')',
			money(tax))
	}
	
	
	// log('\t', money(investAmount),
	// 	'\t', money(monthlyIncome*12),
	// 	'\t', money(raise*12))

	// if (year == stopWorkAfterYears) {
	// 	log("Reached pension")
	// 	monthlyIncome = 0
	// }
	// if (year >= stopWorkAfterYears) {
	// 	log("")
	// 	investAccount
	// }
	// console.log("Yr", year+'\t', commas())
	// console.log("Invest ")	
}

function log() {
	var args = Array.prototype.slice.call(arguments)
	for (var i=0; i<args.length; i++) {
		if (args[i].length < 8) {
			args[i] += '\t'
		}
	}
	console.log(args.join('\t'))
}