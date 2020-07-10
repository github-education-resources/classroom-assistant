import { selected } from "../selectors"
import { submissionCloneFunc } from "./submission-clone"
import { cloneDestination } from "../../settings/selectors"
import { name } from "../../assignment/selectors"

import { clone } from "../../../lib/cloneutils"
import { getAssignmentFolder } from "../../../lib/pathutils"

import Promise from "bluebird"

const submissionClone = submissionCloneFunc(clone)
// PUBLIC: Async thunk action for cloning all selected submissions.
export const submissionCloneAll = () => {
  return (dispatch, getState) => {
    const basePath = cloneDestination(getState())
    const assignmentName = name(getState())
    const cloneDirectory = getAssignmentFolder(basePath, assignmentName)

    const selectedSubmissions = selected(getState())
    return Promise.map(selectedSubmissions, submission => {
      return dispatch(submissionClone(submission, cloneDirectory))
    },
    // TODO: dynamically set this based on system
    { concurrency: 3 })
  }
}
