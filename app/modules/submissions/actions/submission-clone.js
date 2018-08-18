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

export function submissionCloneFunc (clone) {
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

      return new Promise((resolve, reject) => {
        fetchCloneURL(accessToken, submissionProps.id)(getState).then((cloneURL) => {
          clone(
            cloneURL,
            destination,
            (progress) => {
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
            .then(resolve)
            .catch((e) => {
              dispatch(submissionSetCloneStatus(submissionProps.id, "Clone failed: an error has occured."))
              resolve()
            })
        })
      })
    }
  }
}

// PUBLIC: Async thunk action for fetching the clone URL for an assignment

export function fetchCloneURL (accessToken, id) {
  return getState => {
    const typeLabel = all(getState()).type === "individual" ? "assignment_repos" : "group-assignment-repos"

    const urlObj = new URL(url(getState()))
    const cloneURLPath = `${urlObj.origin}/api/internal${urlObj.pathname}/${typeLabel}/${id}/clone_url`
    return new Promise((resolve, reject) => {
      http.get(`${cloneURLPath}?access_token=${accessToken}`, (response) => {
        // Set next page to null, unless we got the header
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
            resolve(cloneURL.toString())
          } else {
            reject(new Error("Failed to fetch temporary cloning URL."))
          }
        })

        response.on("error", function (err) {
          reject(err)
        })
      })
    })
  }
}
