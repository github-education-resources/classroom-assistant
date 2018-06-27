import {setAssignmentTitle} from "./assignment-set-title"
import {setAssignmentType} from "./assignment-set-type"
import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"

export const fetchAssignmentInfo = (assignment_info_url) => {
  return dispatch => {
    dispatch(requestInfo())
  return fetch(assignment_info_url, {
    credentials: 'include'
  }).then(response => response.json())
    .then((data) => {
      dispatch(receiveInfo(data))
      console.log(data)
    })
  }
}
