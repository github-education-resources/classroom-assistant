import { name } from "../../assignment/selectors"
import { cloneDestination } from "../../settings/selectors"

import setCloneProgress from "./setCloneProgress"
import setClonePath from "./setClonePath"
import setCloneStatus from "./setCloneStatus"

import { clone as cloneRepository } from "../../../lib/cloneutils"
import { getClonePath } from "../../../lib/pathutils"

// PUBLIC: Async thunk action for cloning a single submisison. This creator
// wraps around "clone" from "clone-utils" and dispatches actions to update
// progress/display errors in the UI
// TODO: change this comment at the end of refactoring
const clone = (submissionProps) => {
  return (dispatch, getState) => {
    const submissionsBaseDirectory = cloneDestination(getState())
    const assignmentName = name(getState())
    const submissionAuthorUsername = submissionProps.username

    const destination = getClonePath(
      submissionsBaseDirectory,
      assignmentName,
      submissionAuthorUsername
    )

    dispatch(setClonePath(submissionProps.id, destination))
    dispatch(setCloneStatus(submissionProps.id, "Cloning Submission..."))

    return new Promise((resolve, reject) => {
      cloneRepository(
        submissionProps.repoUrl,
        destination,
        (progress) => {
          dispatch(
            setCloneProgress(
              submissionProps.id,
              progress
            )
          )

          if (progress === 100) {
            dispatch(setCloneStatus(submissionProps.id, "Finished Cloning."))
          }
        }
      )
      .then(resolve)
      .catch(() => {
        dispatch(setCloneStatus(submissionProps.id, "Clone failed: an error has occured."))
        resolve()
      })
    })
  }
}

export default clone
