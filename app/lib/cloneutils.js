const NodeGit = require("nodegit")

// Internal: Helper function that constructs the options object used by NodeGit.
const buildOptions = (progressCallback) => {
  const callbacks = new NodeGit.RemoteCallbacks()
  callbacks.transferProgress = progressCallback

  const fetchOptions = new NodeGit.FetchOptions()
  fetchOptions.callbacks = callbacks

  const options = new NodeGit.CloneOptions()
  options.fetchOpts = fetchOptions

  return options
}

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
export const clone = (repoURL, destination, progressCallback) => {
  return new Promise((resolve, reject) => {
    let progressOnCompletion = false

    const options = buildOptions((progressInfo) => {
      const percentage = 100 * progressInfo.receivedObjects() / progressInfo.totalObjects()
      if (percentage === 100) progressOnCompletion = true
      progressCallback(percentage)
    })

    NodeGit.Clone(
      repoURL,
      destination,
      options
    ).then(() => {
      if (!progressOnCompletion) {
        progressCallback(100)
      }
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}
