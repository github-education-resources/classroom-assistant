import { SUBMISSION_CHANGE_ALL } from "../constants"

export const submissionChangeAll = (newValue) => {
  return {
    type: SUBMISSION_CHANGE_ALL,
    newValue: newValue
  }
}
