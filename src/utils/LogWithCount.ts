/**
 *
 * @author fuyg
 * @date  2019-07-24
 */

class LogWithCount {
  private countMax: number
  private count: number
  constructor(countMax = 50) {
    this.countMax = countMax
    this.count = 0
  }

  log(...args: any) {
    if (this.isEnable()) {
      console.log.apply(console, args)
    }
  }

  increase() {
    this.count++
  }

  reset() {
    this.count = 0
  }

  isEnable() {
    const { count, countMax } = this
    return count < countMax
  }
}

export default LogWithCount
