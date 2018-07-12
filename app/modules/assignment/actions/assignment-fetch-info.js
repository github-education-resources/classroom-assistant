import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"
import {errorInfo} from "./assignment-error-info"

import {url} from "../selectors"

export const assignmentFetchInfo = () => {
  return (dispatch, getState) => {
    try {
      var urlObj = new URL(url(getState()))
      var infoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/info`
    } catch (e) {
      dispatch(errorInfo("URL is invalid!"))
      return
    }
    dispatch(requestInfo())
    return window.fetch(infoURL, {
      credentials: "include"
    })
      .then(response => response.json())
      .then((data) => {
        dispatch(receiveInfo(data.name, data.type))
      })
      .catch((e) => {
        console.log(e)
        dispatch(errorInfo("Could not find assignment."))
      })
  }
}
