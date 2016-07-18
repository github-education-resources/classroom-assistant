const NodeGit = require("nodegit")

export const clone = (repoURL, destination, progressCallback) => {
  return new Promise((resolve, reject) => {
    const options = new NodeGit.CloneOptions()

    const fetchOptions = new NodeGit.FetchOptions()
    options.fetchOpts = fetchOptions

    const callbacks = new NodeGit.RemoteCallbacks()
    fetchOptions.callbacks = callbacks

    let progressNotifiedOnCompletion = false

    callbacks.transferProgress = (something) => {
      const percentage = 100 * something.receivedObjects() / something.totalObjects()

      if (percentage === 100) {
        progressNotifiedOnCompletion = true
      }

      progressCallback(percentage)
    }

    NodeGit.Clone(
      repoURL,
      destination,
      options
    ).then(() => {
      if (!progressNotifiedOnCompletion) {
        progressCallback(100)
      }
      resolve()
    })
  })
}
