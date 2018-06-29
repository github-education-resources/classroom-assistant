import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"
import {errorInfo} from "./assignment-error-info"
import {remote} from "electron"

import {url} from "../selectors"

export const fetchAssignmentInfo = () => {
  return (dispatch, getState) => {
    try {
      var urlObj = new URL(url(getState()))
      var infoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/info`
    } catch (e) {
      dispatch(errorInfo("URL is invalid ¯\\_(ツ)_/¯"))
      return
    }

    dispatch(requestInfo())
    return fetch(infoURL, {
      credentials: "include"
    }).then(response => response.json())
      .then((data) => {
        dispatch(receiveInfo(data.name, data.type))
        remote.getGlobal("sharedObj").accessToken = data.accessToken
      })
      .catch((e) => {
        dispatch(errorInfo("Could not find assignment."))
      })
  }
}
