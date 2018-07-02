import { name } from "../../assignment/selectors"
import { cloneDestination } from "../../settings/selectors"

import { submissionSetCloneProgress } from "./submission-set-clone-progress"
import { submissionSetClonePath } from "./submission-set-clone-path"
import { submissionSetCloneStatus } from "./submission-set-clone-status"

import { getClonePath } from "../../../lib/pathutils"
import { remote } from "electron"

// PUBLIC: Async thunk action for cloning a single submisison. This creator
// wraps around "clone" from "clone-utils" and dispatches actions to update
// progress/display errors in the UI

export function submissionCloneFunc (clone) {
  return (submissionProps) => {
    return (dispatch, getState) => {
      const submissionsBaseDirectory = cloneDestination(getState())
      const assignmentName = name(getState())
      const submissionAuthorUsername = submissionProps.username
      const accessToken = remote.getGlobal("sharedObj") ? remote.getGlobal("sharedObj").accessToken : null

      const destination = getClonePath(
        submissionsBaseDirectory,
        assignmentName,
        submissionAuthorUsername
      )

      dispatch(submissionSetClonePath(submissionProps.id, destination))
      dispatch(submissionSetCloneStatus(submissionProps.id, "Cloning Submission..."))

      return new Promise((resolve, reject) => {
        clone(
          submissionProps.repoUrl,
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
          },
          accessToken
        )
          .then(resolve)
          .catch((e) => {
            dispatch(submissionSetCloneStatus(submissionProps.id, "Clone failed: an error has occured."))
            resolve()
          })
      })
    }
  }
}
