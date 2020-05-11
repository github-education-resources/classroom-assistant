import { ASSIGNMENT_SET_TYPE } from "../constants"

export const setAssignmentType = (type) => {
  return {
    type: ASSIGNMENT_SET_TYPE,
    payload: type
  }
}
