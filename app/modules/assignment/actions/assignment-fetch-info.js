import { remote } from "electron"
import axios from "axios"

import { receiveInfo } from "./assignment-receive-info"
import { requestInfo } from "./assignment-request-info"
import { errorInfo } from "./assignment-error-info"
import { url } from "../selectors"

/**
 * PUBLIC: Fetch information about assignment from URL in state
 *
 * @return An async thunk action which resolves once assigment info has been
 * fetched or if has errored
 */
export const assignmentFetchInfo = () => {
  return async (dispatch, getState) => {
    let urlObj, infoURL

    const accessToken = remote.getGlobal("accessToken")

    try {
      urlObj = new URL(url(getState()))
      if (urlObj.origin !== "https://classroom.github.com") {
        dispatch(errorInfo("URL is invalid!"))
        return
      }
      infoURL = `https://classroom.github.com/api/internal${urlObj.pathname}?access_token=${accessToken}`
    } catch (e) {
      dispatch(errorInfo("URL is invalid!"))
      return
    }
    dispatch(requestInfo())

    try {
      const response = await axios.get(infoURL)
      if (response.data.title && response.data.type) {
        dispatch(receiveInfo(response.data.title, response.data.type))
      } else {
        dispatch(errorInfo("Could not find assignment."))
      }
    } catch (error) {
      dispatch(errorInfo("Could not find assignment."))
    }
  }
}
