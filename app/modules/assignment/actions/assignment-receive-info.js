import {ASSIGNMENT_RECEIVE_INFO} from "../constants"

export const receiveInfo = (data) => {
  return {
    type: ASSIGNMENT_RECEIVE_INFO,
    payload: data,
  }
}
