import { ASSIGNMENT_SET_TITLE } from "../constants"

export const setAssignmentTitle = (title) => {
  return {
    type: ASSIGNMENT_SET_TITLE,
    payload: title
  }
}
