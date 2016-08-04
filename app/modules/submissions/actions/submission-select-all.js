import { SUBMISSION_SELECT_ALL } from "../constants"

export const submissionSelectAll = (newValue) => {
  return {
    type: SUBMISSION_SELECT_ALL,
    newValue: newValue
  }
}
