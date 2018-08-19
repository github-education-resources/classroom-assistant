import path from "path"
import dateFormat from "dateformat"
import fs from "fs-extra"

export const getClonePath = async (basePath, assignmentName, studentUsername) => {
  const time = dateFormat(new Date(), "mm-dd-yyyy-hh-MM-ss")
  const submissionPath = path.join(basePath, `${assignmentName}-${time}`, studentUsername)
  try {
    await fs.ensureDir(submissionPath)
    return submissionPath
  } catch (error) {
    return null
  }
}
