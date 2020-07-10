import { SUBMISSION_SELECT } from "../constants"

export const submissionSelect = (id) => {
  return {
    type: SUBMISSION_SELECT,
    id: id
  }
}
