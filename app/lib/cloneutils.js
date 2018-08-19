import { GitProcess } from "dugite"
import ProgressParser from "./progressutils"

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
export const clone = async (repoURL, destination, progressCallback) => {
  console.log(`destination ${destination}`)
  const options = { }

  if (progressCallback) {
    const progressParser = new ProgressParser(progressCallback)
    options.processCallback = progressParser.parseProgressFromProcess
  }

  progressCallback(0)

  const result = await GitProcess.exec(
    ["clone", repoURL, "--progress", "."],
    destination,
    options
  )
  // TODO Add Error handling
  if (result.exitCode === 0) {
    progressCallback(100)
  }
}
