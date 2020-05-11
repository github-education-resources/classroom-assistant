import { SUBMISSION_SET_CLONE_STATUS } from "../constants"

export const submissionSetCloneStatus = (id, cloneStatus) => {
  return {
    type: SUBMISSION_SET_CLONE_STATUS,
    id,
    cloneStatus
  }
}
