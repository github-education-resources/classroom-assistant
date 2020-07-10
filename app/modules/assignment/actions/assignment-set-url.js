import { ASSIGNMENT_SET_URL } from "../constants"

export const setAssignmentURL = (url) => {
  return {
    type: ASSIGNMENT_SET_URL,
    url: url
  }
}
