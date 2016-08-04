import {SUBMISSION_SET_STATUS} from "../constants"

export const submissionSetStatus = (id, cloneStatus) => {
  return {
    type: SUBMISSION_SET_STATUS,
    id,
    cloneStatus
  }
}
