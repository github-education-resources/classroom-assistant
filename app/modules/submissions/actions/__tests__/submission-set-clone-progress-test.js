jest.unmock("../submission-set-clone-progress.js")

import { submissionSetCloneProgress } from "../submission-set-clone-progress.js"
import { SUBMISSION_SET_CLONE_PROGRESS } from "../../constants"

describe("submissionSetCloneProgress", () => {
  const SUBMISSION_ID = 1234
  const PROGRESS_VALUE = 34

  it("Creates an action with correct id", () => {
    expect(
      submissionSetCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).id
    ).toEqual(SUBMISSION_ID)
  })

  it("Creates an action with correct type", () => {
    expect(
      submissionSetCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).type
    ).toEqual(SUBMISSION_SET_CLONE_PROGRESS)
  })

  it("Creates an action with correct percentage", () => {
    expect(
      submissionSetCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).cloneProgress
    ).toEqual(PROGRESS_VALUE)
  })
})
