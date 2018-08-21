import path from "path"
import dateFormat from "dateformat"
import fs from "fs-extra"
import sanitize from "sanitize-filename"

export const getAssignmentFolder = (basePath, assignmentName) => {
  const time = dateFormat(new Date(), "mm-dd-yyyy-hh-MM-ss")
  return path.join(basePath, sanitize(`${assignmentName}-${time}`))
}

export const getClonePath = async (basePath, studentUsername) => {
  const submissionPath = path.join(basePath, sanitize(studentUsername))
  try {
    await fs.ensureDir(submissionPath)
    return submissionPath
  } catch (error) {
    return null
  }
}
