let goldPrice = 3503.06

export function getGoldPrice( min = 2641, max = 4969) {

  const change = Math.random() < 0.5 ? -105.09 : 105.09
  goldPrice += change
  goldPrice = Math.max(min, Math.min(max, goldPrice))
  const roundedGoldPrice = goldPrice.toFixed(2)
  return roundedGoldPrice
}