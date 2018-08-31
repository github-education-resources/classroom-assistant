const byline = require("byline")

const steps = [
  { title: "remote: Compressing objects", weight: 0.1 },
  { title: "Receiving objects", weight: 0.6 },
  { title: "Resolving deltas", weight: 0.1 },
  { title: "Checking out files", weight: 0.2 },
]

const tryParse = (str) => {
  const value = /(\d+)%/.exec(str)
  if (value) {
    const percentValue = value[1]
    const percent = parseInt(percentValue, 10)
    if (!isNaN(percent)) {
      return percent
    }
  }
}

class ProgressParser {
  constructor (progressCallback) {
    this.lastProgress = 0
    this.progressCallback = progressCallback
    this.parseProgressFromProcess = this.parseProgressFromProcess.bind(this)
  }

  parseProgressFromProcess (process) {
    byline(process.stderr).on("data", (chunk) => {
      steps.forEach((step, index) => {
        if (chunk.startsWith(step.title)) {
          const percentOfStep = tryParse(chunk)
          if (percentOfStep) {
            let percent = steps.slice(0, index).reduce((sum, step) => sum + (step.weight * 100), 0)
            percent += (percentOfStep / 100) * (step.weight * 100)
            // Only dispatch to store if progress jumped more than 10%
            // so we don't overload redux
            if (percent > this.lastProgress + 10 || percent === 100) {
              this.progressCallback(percent)
              this.lastProgress = percent
            }
          }
        }
      })
    })
  }
}

export default ProgressParser
