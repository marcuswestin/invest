require('./util')

var annualPercentages = {
	'8': 0.6434031,
	'6': 0.486778,
	'4': 0.32737,
	'2': 0.16515
}


var annualPercentage =6
var monthlyGainPercent = annualPercentages[annualPercentage]
var monthlyIncome = 4000 // after tax
var monthlyCosts = 3000
var annualGainTax = 40 // percent

var investAccount = 0
var checkingAccount = 0
var annualInvestPercent = 60 // percent of checking account to invest at end of year
var annualRaisePercent = 4 // percent
var annualCostIncreasePercent = 2 // percent
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
	'\n\t', annualRaisePercent+'% raise per year',	
	'\n\t', annualCostIncreasePercent+'% increase in annual costs',
	'\n============')

log('Year\t$ Made\t\t$ Spent\t\tChecking Acc\tInvest This\tAfter Invest\tRetirmnt fund\tNew Salary (raised)\tCapital Gains Tax')

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
	var eoySpent = money(monthlyCosts*12)
	
	var raise = monthlyIncome * annualRaisePercent/100
	monthlyIncome += raise
	var investAmount = checkingAccount * annualInvestPercent / 100
	checkingAccount -= investAmount
	investAccount += investAmount
	investAccount -= tax
	monthlyCosts *= (1+annualCostIncreasePercent/100)

	var eoyInvestedAmount = money(investAmount)
	var eoyNewIncome = money(monthlyIncome * 12)
	var eoyRaise = money(raise * 12)
	var eoyCheckingAfterInvest = money(checkingAccount)

	if (year % reportEvery == 0) {
		log(year,
			eoyIncome, eoySpent, eoyCheckingAcc, eoyInvestedAmount, eoyCheckingAfterInvest, 
			eoyInvestAcc, eoyNewIncome + '    ('+eoyRaise+')',
			money(tax))
	}
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