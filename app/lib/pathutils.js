import path from "path"
import dateFormat from "dateformat"
import fs from "fs-extra"

export const getAssignmentFolder = (basePath, assignmentName) => {
  const time = dateFormat(new Date(), "mm-dd-yyyy-hh-MM-ss")
  return path.join(basePath, `${assignmentName}-${time}`)
}

export const getClonePath = async (basePath, studentUsername) => {
  const submissionPath = path.join(basePath, studentUsername)
  try {
    await fs.ensureDir(submissionPath)
    return submissionPath
  } catch (error) {
    return null
  }
}
