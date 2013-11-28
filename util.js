money = function(num) {
	var sign = (num < 0 ? '-' : '')
	var digits = Math.abs(Math.floor(num)).toString().split('')
	var i=0
	var result = []
	while (digits.length) {
		i = Math.min(3, digits.length)
		result.unshift(digits.splice(digits.length-i, i).join(''))
	}
	return sign+'$'+result.join(',')
}

