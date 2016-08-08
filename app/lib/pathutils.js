import path from "path"
import dateFormat from "dateformat"

export const getClonePath = (basePath, assignmentName, studentUsername) => {
  const time = dateFormat(new Date(), "mm-dd-yyyy-hh-MM-ss")
  return path.join(basePath, `${assignmentName}-${time}`, studentUsername)
}
