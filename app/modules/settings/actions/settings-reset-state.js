import { assignmentReset } from "../../assignment/actions/assignment-reset"
import { submissionReset } from "../../submissions/actions/submission-reset"
import { paginationReset } from "../../pagination/actions/pagination-reset"

/**
 * PUBLIC: Resets application, submission and pagination state
 *
 * @return async thunk action which resolves once app has been reset
 */
export const settingsResetState = () => {
  return dispatch => {
    dispatch(assignmentReset())
    dispatch(submissionReset())
    dispatch(paginationReset())
  }
}
