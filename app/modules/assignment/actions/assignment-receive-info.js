import {ASSIGNMENT_RECEIVE_INFO} from "../constants"

export const receiveInfo = (name, type) => {
  return {
    type: ASSIGNMENT_RECEIVE_INFO,
    payload: {name: name, type: type},
  }
}
