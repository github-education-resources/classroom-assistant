import { SUBMISSION_SET_CLONE_PATH } from "../constants"

export const submissionSetClonePath = (id, clonePath) => {
  return {
    type: SUBMISSION_SET_CLONE_PATH,
    id,
    clonePath
  }
}
