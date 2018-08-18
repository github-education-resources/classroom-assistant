import _ from "underscore"
import { GitProcess } from "dugite"

const byline = require("byline")

const steps = [
  { title: "remote: Compressing objects", weight: 0.1 },
  { title: "Receiving objects", weight: 0.6 },
  { title: "Resolving deltas", weight: 0.3 },
]

let progressCallback, repoURL

let callBackCount = 0

// Public: Clones a public git repository to the specified destination directory,
// and notifies the caller of clone progress via callback.
//
// repoURL          - String containing the URL of the public Git repository. It
//                    should be possible to clone the repository with `git clone`
// destination      - String containing Absolute path where the repository files will
//                    be cloned.
// progressCallback - Callback Function used for notifying the caller of clone
//                    progress. The function is called with the percentage of object
//                    fetched.
//
// Examples
//
//    clone(
//      "https://github.com/education/classroom-desktop",
//      "/tmp/desktop-classroom",
//      (percentage) => {
//        console.log("Percentage complete: " + percentage + "%")
//      }
//    ).then(() => {
//      console.log("Finished cloning")
//    })
//
// Returns a Promise
export const clone = async (repoURLVar, destination, progressCallbackFunc, token) => {
  const progressOnCompletion = false
  progressCallback = progressCallbackFunc
  repoURL = repoURLVar

  const options = {
    env: {
      "GIT_HTTP_USER_AGENT": "dugite/2.12.0",
      "GIT_TRACE": "1",
      "GIT_CURL_VERBOSE": "1"
    },
  }

  if (progressCallback) {
    options.processCallback = parseProgressFromProcess
  }

  progressCallback(0)

  callBackCount = 0
  console.log(`Clone started for ${repoURL}`)
  const result = await GitProcess.exec(
    ["clone", repoURL, "--progress"],
    "/Users/srinjoym/temp_clone",
    options
  )
  console.log(`Clone finished for ${repoURL}`)
  // TODO Add Error handling
  if (result.exitCode === 0) {
    progressCallback(100)
  }
}

const parseProgressFromProcess = (process) => {
  byline(process.stderr).on("data", (chunk) => {
    console.log(`Callback Count ${callBackCount++}`)
    console.log(process)
    steps.forEach((step, index) => {
      if (chunk.startsWith(step.title)) {
        const percentOfStep = tryParse(chunk)
        if (percentOfStep) {
          let percent = steps.slice(0, index).reduce((sum, step) => sum + step.weight, 0)
          percent += (percentOfStep / 100) * step.weight
          console.log(`Callback Count ${callBackCount} Percentage: ${percent * 100}`)
          progressCallback(percent * 100)
        }
      }
    })
    console.log(`Callback Count ${callBackCount} Finished`)
  })
}

const tryParse = (str) => {
  const value = /(\d+)\%/.exec(str)
  if (value) {
    const percentValue = value[1]
    const percent = parseInt(percentValue, 10)
    if (!isNaN(percent)) {
      return percent
    }
  }
}
