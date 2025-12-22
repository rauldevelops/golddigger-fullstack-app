let goldPrice = 3503.06

export function getGoldPrice( min = 2641, max = 4530) {

  const change = Math.random() < 0.5 ? -105.09 : 105.09
  goldPrice += change
  goldPrice = Math.max(min, Math.min(max, goldPrice))
  const roundedGoldPrice = preciseRound(goldPrice, 2)
  return roundedGoldPrice
}

function preciseRound(num, decimalPlaces) {
  // Convert the number to exponential notation string, applying the rounding in the exponent
  const n = Math.round(num + "e+" + decimalPlaces);
  // Convert back from exponential notation to a regular number
  return Number(n + "e-" + decimalPlaces);
}