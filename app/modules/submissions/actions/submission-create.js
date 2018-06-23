import {SUBMISSION_CREATE} from "../constants"

export const submissionCreate = (data) => {
  return {
    type: SUBMISSION_CREATE,
    data: data
  }
}
