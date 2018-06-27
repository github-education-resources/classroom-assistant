import {SUBMISSION_CREATE} from "../constants"

export const submissionCreate = (data) => {
  if (data.username && !data.avatarUrl) {
    data.avatarUrl = `https://avatars.githubusercontent.com/${data.username}?v=3&size=96`
  }
  return {
    type: SUBMISSION_CREATE,
    data: data,
  }
}
