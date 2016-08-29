import { selected } from "../selectors"
import clone from "./clone"

// PUBLIC: Async thunk action for cloning all selected submissions.
const cloneAll = () => {
  return (dispatch, getState) => {
    const selectedSubmissions = selected(getState())
    const promises = []
    selectedSubmissions.forEach((each) => promises.push(dispatch(clone(each))))
    return Promise.all(promises).then()
  }
}

export default cloneAll
