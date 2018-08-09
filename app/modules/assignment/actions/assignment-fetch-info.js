import {receiveInfo} from "./assignment-receive-info"
import {requestInfo} from "./assignment-request-info"
import {errorInfo} from "./assignment-error-info"

import {url} from "../selectors"

const keytar = require("keytar")

/**
 * PUBLIC: Fetch information about assignment from URL in state
 *
 * @return An async thunk action which resolves once assigment info has been
 * fetched or if has errored
 */
export const assignmentFetchInfo = () => {
  return async (dispatch, getState) => {
    let urlObj, infoURL

    const accessToken = await keytar.findPassword("Classroom-Desktop")

    try {
      urlObj = new URL(url(getState()))
      infoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}?access_token=${accessToken}`
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
        dispatch(receiveInfo(data.title, data.type))
      })
      .catch((e) => {
        dispatch(errorInfo("Could not find assignment."))
      })
  }
}
