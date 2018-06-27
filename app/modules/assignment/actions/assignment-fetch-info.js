import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"

export const fetchAssignmentInfo = (assignmentInfoURL) => {
  return dispatch => {
    dispatch(requestInfo())
    return fetch(assignmentInfoURL, {
      credentials: "include"
    }).then(response => response.json())
      .then((data) => {
        dispatch(receiveInfo(data))
        console.log(data)
      })
  }
}
