import { selected } from "../selectors"
import { submissionClone } from "./submission-clone"

// PUBLIC: Async thunk action for cloning all selected submissions.
export const submissionCloneAll = () => {
  return (dispatch, getState) => {
    const selectedSubmissions = selected(getState())
    const promises = []
    selectedSubmissions.forEach((each) => promises.push(dispatch(submissionClone(each))))
    return Promise.all(promises).then()
  }
}
