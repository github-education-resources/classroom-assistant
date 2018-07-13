import { selected } from "../selectors"
import { submissionCloneFunc } from "./submission-clone"

import { clone } from "../../../lib/cloneutils"
import Promise from "bluebird"

const submissionClone = submissionCloneFunc(clone)
// PUBLIC: Async thunk action for cloning all selected submissions.
export const submissionCloneAll = () => {
  return (dispatch, getState) => {
    var selectedSubmissions = selected(getState())
    return Promise.map(selectedSubmissions, submission => {
      return dispatch(submissionClone(submission))
    },
    {concurrency: 2})
  }
}
