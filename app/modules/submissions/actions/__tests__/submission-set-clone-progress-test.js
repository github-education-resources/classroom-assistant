import { expect } from "chai"

import { submissionSetCloneProgress } from "../submission-set-clone-progress"
import { SUBMISSION_SET_CLONE_PROGRESS } from "../../constants"

describe("submissionSetCloneProgress", () => {
  const SUBMISSION_ID = 1234
  const PROGRESS_VALUE = 34

  it("Creates an action with correct id", () => {
    expect(
      submissionSetCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).id
    ).to.equal(SUBMISSION_ID)
  })

  it("Creates an action with correct type", () => {
    expect(
      submissionSetCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).type
    ).to.equal(SUBMISSION_SET_CLONE_PROGRESS)
  })

  it("Creates an action with correct percentage", () => {
    expect(
      submissionSetCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).cloneProgress
    ).to.equal(PROGRESS_VALUE)
  })
})
