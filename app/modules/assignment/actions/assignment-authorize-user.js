import {ASSIGNMENT_AUTHORIZE_USER} from "../constants"

export const assignmentAuthorizeUser = (value) => {
  return {
    type: ASSIGNMENT_AUTHORIZE_USER,
    payload: value,
  }
}
