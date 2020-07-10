import { setAssignmentURL } from "./assignment-set-url"
import { errorInfo } from "./assignment-error-info"

/**
 * Verifies assignment URL to ensure we only redirect to the Classroom API
 * @param {String} url URL string passed into deep link
 */
export const verifyAssignmentURL = (url) => {
  return async (dispatch, _) => {
    try {
      const parsedURL = parseAssignmentURL(url)
      const baseURL = "https://classroom.github.com/classrooms"

      const rebuiltURL = `${baseURL}/${parsedURL.classroomTitle}/${parsedURL.assignmentType}/${parsedURL.assignmentTitle}`
      dispatch(setAssignmentURL(rebuiltURL))
    } catch (err) {
      dispatch(errorInfo("URL is invalid!"))
    }
  }
}

/**
 * Parses URL from deep link and verifies that each path component passes
 * regex checks from Classroom
 * @param {String} url URL string passed into deep link
 */
const parseAssignmentURL = (url) => {
  const urlObj = new URL(url)
  verifyHostname(urlObj.hostname)

  const pathComponents = urlObj.pathname.substr(1).split("/")
  if (pathComponents.length === 4) {
    return {
      classroomTitle: verifyTitle(pathComponents[1]),
      assignmentType: verifyAssignmentType(pathComponents[2]),
      assignmentTitle: verifyTitle(pathComponents[3])
    }
  } else {
    throw new Error("Path arguments malformed")
  }
}

/**
 * Raises an exception if the URL hostname is not Classroom
 * @param {String} hostname string hostname in assignment URL
 */
const verifyHostname = (hostname) => {
  if (hostname !== "classroom.github.com") {
    throw new Error("Invalid hostname.")
  }
}

/**
 * Verifies that assignment type is valid
 * @param {String} type Assignment type from URL
 */
const verifyAssignmentType = (type) => {
  const possibleTypes = ["assignments", "group-assignments"]
  if (possibleTypes.includes(type)) {
    return encodeURIComponent(type)
  } else {
    throw new Error("Invalid assignment type.")
  }
}

/**
 * Verifies assignment and classroom titles by matching
 * against the same regex we use on Classroom
 * @param {String} title Classroom or Assignment title
 */
const verifyTitle = (title) => {
  const titleRegex = RegExp(/^[-a-zA-Z0-9_]*$/)
  if (titleRegex.test(title)) {
    return encodeURIComponent(title)
  } else {
    throw new Error("Title contains invalid characters")
  }
}
