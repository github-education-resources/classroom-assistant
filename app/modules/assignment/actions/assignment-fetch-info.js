import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"
import {errorInfo} from "./assignment-error-info"
import {settingsLoginUser} from "../../settings/actions/settings-login-user"

import {remote} from "electron"
import {url, authorized} from "../selectors"

export const assignmentFetchInfo = () => {
  return (dispatch, getState) => {
    try {
      var urlObj = new URL(url(getState()))
      var infoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/info`
    } catch (e) {
      dispatch(errorInfo("URL is invalid!"))
      return
    }

    if (!authorized(getState())) {
      dispatch(settingsLoginUser(url(getState()))).then(() => {
        return loadAssignment(dispatch, getState, infoURL)
      })
    } else {
      return loadAssignment(dispatch, getState, infoURL)
    }
  }
}

const loadAssignment = (dispatch, getState, infoURL) => {
  dispatch(requestInfo())
  return window.fetch(infoURL, {
    credentials: "include"
  })
    .then(response => {
      return response.json()
    })
    .then((data) => {
      dispatch(receiveInfo(data.name, data.type))
      if (remote.getGlobal("sharedObj")) {
        remote.getGlobal("sharedObj").accessToken = data.accessToken
      }
    })
    .catch((e) => {
      console.log(e)
      dispatch(errorInfo("Could not find assignment."))
    })
}
