import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"
import {errorInfo} from "./assignment-error-info"
import {remote, ipcRenderer} from "electron"

import {url, authorized} from "../selectors"

export const assignmentFetchInfo = () => {
  return (dispatch, getState) => {
    try {
      var urlObj = new URL(url(getState()))
      var infoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/info`
    } catch (e) {
      dispatch(errorInfo("URL is invalid ¯\\_(ツ)_/¯"))
      return
    }

    if (!authorized(getState())) {
      console.log("Sent authorize user message!")
      ipcRenderer.send("requestAuthorization", url(getState()))
    }

    ipcRenderer.on("receivedAuthorization", () => {
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
    })
  }
}
