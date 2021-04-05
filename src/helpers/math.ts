export function sum (values: Array<number>): number {
  return values.reduce(function (sum, value) {
    return sum + value
  }, 0)
}

export function average (values: Array<number>): number {
  const total = sum(values)
  return total / values.length
}

export function standardDeviation (values: Array<number>): number {
  const avg = average(values)

  const diffCalc = values.map(function (value) {
    const diff = value - avg
    return diff * diff
  })

  const avgDiffCalc = average(diffCalc)
  return Math.sqrt(avgDiffCalc)
}
