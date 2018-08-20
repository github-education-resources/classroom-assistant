import * as http from "http"
import { name, url, all } from "../../assignment/selectors"
import { cloneDestination } from "../../settings/selectors"

import { submissionSetCloneProgress } from "./submission-set-clone-progress"
import { submissionSetClonePath } from "./submission-set-clone-path"
import { submissionSetCloneStatus } from "./submission-set-clone-status"

import { getClonePath } from "../../../lib/pathutils"

const keytar = require("keytar")

// PUBLIC: Async thunk action for cloning a single submisison. This creator
// wraps around "clone" from "clone-utils" and dispatches actions to update
// progress/display errors in the UI

export const submissionCloneFunc = (clone) => {
  return (submissionProps) => {
    return async (dispatch, getState) => {
      const submissionsBaseDirectory = cloneDestination(getState())
      const assignmentName = name(getState())
      const submissionAuthorUsername = submissionProps.username

      // Sets to null if password cannot be found
      // TODO: Add specific error message/ask for reauthorization if clone
      // fails
      const accessToken = await keytar.findPassword("Classroom-Desktop")

      const destination = getClonePath(
        submissionsBaseDirectory,
        assignmentName,
        submissionAuthorUsername
      )

      dispatch(submissionSetClonePath(submissionProps.id, destination))
      dispatch(submissionSetCloneStatus(submissionProps.id, "Cloning Submission..."))

      try {
        const cloneURL = await fetchCloneURL(accessToken, submissionProps.id)(getState)
        await clone(cloneURL, destination, progressCallback(submissionProps)(dispatch))
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

    http.get(`${cloneURLPath}?access_token=${accessToken}`, (response) => {
      let body = ""

      response.on("data", (chunk) => {
        body += chunk.toString()
      })

      response.on("end", () => {
        const json = JSON.parse(body)
        const tempCloneURL = json.temp_clone_url
        if (tempCloneURL) {
          const cloneURL = new URL(tempCloneURL)
          if (!cloneURL.password) {
            cloneURL.username = ""
          }
          return cloneURL.toString()
        } else {
          throw new Error("Failed to fetch temporary cloning URL.")
        }
      })

      response.on("error", function (err) {
        throw err
      })
    })
  }
}

const progressCallback = (progress) => {
  return submissionProps => {
    return dispatch => {
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
  }
}
