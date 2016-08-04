
import {SUBMISSION_SET_CLONE_PROGRESS} from "../constants"

export const submissionSetCloneProgress = (id, cloneProgress) => {
  return {
    type: SUBMISSION_SET_CLONE_PROGRESS,
    id,
    cloneProgress
  }
}
