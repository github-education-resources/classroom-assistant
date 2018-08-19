import path from "path"
import dateFormat from "dateformat"
import mkdirp from "mkdirp"

export const getClonePath = (basePath, assignmentName, studentUsername) => {
  const time = dateFormat(new Date(), "mm-dd-yyyy-hh-MM-ss")
  const submissionPath = path.join(basePath, `${assignmentName}-${time}`, studentUsername)
  try {
    mkdirp(submissionPath)
    return submissionPath
  } catch (error) {
    return null
  }
}
