import {SUBMISSION_CREATE} from "../constants"

export const submissionCreate = (submissions) => {
  // Come back later
  submissions.map((submission) => {
    if (submission.username && !submission.avatarUrl) {
      submission.avatarUrl = `https://avatars.githubusercontent.com/${submission.username}?v=3&size=96`
    }
  })
  return {
    type: SUBMISSION_CREATE,
    submissions: submissions,
  }
}
