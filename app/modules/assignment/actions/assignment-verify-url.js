import {setAssignmentURL} from "./assignment-set-url"
import {errorInfo} from "./assignment-error-info"

export const verifyAssignmentURL = (url) => {
  return async (dispatch, _) => {
    const urlObj = new URL(url)
    const pathRegex = RegExp("/classrooms/.*/(group-)?assignments/.*")

    const isHostValid = urlObj.host === "classroom.github.com"
    const isPathValid = pathRegex.test(urlObj.pathname)

    if (isHostValid && isPathValid) { // do some validations on the URL
      dispatch(setAssignmentURL(url))
    } else {
      dispatch(errorInfo("URL is invalid!"))
    }
  }
}
