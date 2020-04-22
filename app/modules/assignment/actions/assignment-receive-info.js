import { ASSIGNMENT_RECEIVE_INFO } from "../constants"

export const receiveInfo = (title, type) => {
  return {
    type: ASSIGNMENT_RECEIVE_INFO,
    payload: { title: title, type: type },
  }
}
