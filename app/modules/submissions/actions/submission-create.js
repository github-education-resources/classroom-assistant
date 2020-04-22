import { SUBMISSION_CREATE } from "../constants"

export const submissionCreate = (submissions) => {
  // TODO: Find a better place to generate this avatarURL, do we even need to
  // track this in the state?
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
