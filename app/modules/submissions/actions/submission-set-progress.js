
import {SUBMISSION_SET_PROGRESS} from "../constants"

export const submissionSetProgress = (id, progress) => {
  return {
    type: SUBMISSION_SET_PROGRESS,
    id,
    progress
  }
}
