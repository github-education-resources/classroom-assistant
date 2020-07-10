import { SUBMISSION_SET_CLONE_PROGRESS } from "../constants"

export const submissionSetCloneProgress = (id, cloneProgress) => {
  if (cloneProgress < 0) {
    cloneProgress = 0
  } else if (cloneProgress > 100) {
    cloneProgress = 100
  }

  return {
    type: SUBMISSION_SET_CLONE_PROGRESS,
    id,
    cloneProgress
  }
}
