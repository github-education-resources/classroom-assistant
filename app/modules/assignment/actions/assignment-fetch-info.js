import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"
import {remote} from "electron"

export const fetchAssignmentInfo = (assignmentInfoURL) => {
  return dispatch => {
    dispatch(requestInfo())
    return fetch(assignmentInfoURL, {
      credentials: "include"
    }).then(response => response.json())
      .then((data) => {
        dispatch(receiveInfo(data.name, data.type))
        remote.getGlobal("sharedObj").accessToken = data.accessToken
      })
  }
}
