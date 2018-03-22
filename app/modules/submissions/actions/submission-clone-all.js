import { selected } from "../selectors"
import { submissionCloneFunc } from "./submission-clone"

import { clone } from "../../../lib/cloneutils"

const submissionClone = submissionCloneFunc(clone)

// PUBLIC: Async thunk action for cloning all selected submissions.
export const submissionCloneAllFunc = () => {
  return (dispatch, getState) => {
    const selectedSubmissions = selected(getState())
    const promises = []
    selectedSubmissions.forEach((each) => promises.push(dispatch(submissionClone(each))))
    return Promise.all(promises).then()
  }
}
