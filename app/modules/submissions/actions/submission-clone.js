import { remote } from "electron"
import axios from "axios"
import { url, all } from "../../assignment/selectors"

import { submissionSetCloneProgress } from "./submission-set-clone-progress"
import { submissionSetClonePath } from "./submission-set-clone-path"
import { submissionSetCloneStatus } from "./submission-set-clone-status"

import { getClonePath } from "../../../lib/pathutils"

// PUBLIC: Async thunk action for cloning a single submisison. This creator
// wraps around "clone" from "clone-utils" and dispatches actions to update
// progress/display errors in the UI

export const submissionCloneFunc = (clone) => {
  return (submissionProps, cloneDirectory) => {
    return async (dispatch, getState) => {
      const submissionAuthorUsername = submissionProps.username

      // Sets to null if password cannot be found
      // TODO: Add specific error message/ask for reauthorization if clone
      // fails
      const accessToken = remote.getGlobal("accessToken")

      const destination = await getClonePath(cloneDirectory, submissionAuthorUsername)

      if (!destination) {
        dispatch(submissionSetCloneStatus(submissionProps.id, "Clone failed: Folder could not be created."))
        return
      }

      dispatch(submissionSetClonePath(submissionProps.id, destination))
      dispatch(submissionSetCloneStatus(submissionProps.id, "Cloning Submission..."))

      try {
        const cloneURL = await fetchCloneURL(accessToken, submissionProps.id)(getState)
        await clone(
          cloneURL,
          destination,
          progress => {
            dispatch(
              submissionSetCloneProgress(
                submissionProps.id,
                progress
              )
            )
            if (progress === 100) {
              dispatch(submissionSetCloneStatus(submissionProps.id, "Finished Cloning."))
            }
          }
        )
      } catch (error) {
        dispatch(submissionSetCloneStatus(submissionProps.id, "Clone failed: an error has occured."))
      }
    }
  }
}

// PUBLIC: Async thunk action for fetching the clone URL for an assignment. Hits clone_url endpoint on
// Classroom API to get cloning url for current submission, if public url is returned then it strips the
// username from the url because of a bug in NodeGit

export const fetchCloneURL = (accessToken, id) => {
  return async getState => {
    const typeLabel = all(getState()).type === "individual" ? "assignment_repos" : "group-assignment-repos"

    const urlObj = new URL(url(getState()))
    const cloneURLPath = `${urlObj.origin}/api/internal${urlObj.pathname}/${typeLabel}/${id}/clone_url`

    const resp = await axios.get(`${cloneURLPath}?access_token=${accessToken}`)
    const tempCloneURL = resp.data.temp_clone_url

    if (tempCloneURL) {
      const cloneURL = new URL(tempCloneURL)
      if (!cloneURL.password) {
        cloneURL.username = ""
      }
      return cloneURL.toString()
    } else {
      throw new Error("Failed to fetch temporary cloning URL.")
    }
  }
}
