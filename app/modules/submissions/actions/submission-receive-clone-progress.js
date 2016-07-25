
import {SUBMISSION_RECEIVE_CLONE_PROGRESS} from "../constants"

export const submissionReceiveCloneProgress = (id, progress) => {
  return {
    type: SUBMISSION_RECEIVE_CLONE_PROGRESS,
    id,
    progress
  }
}
