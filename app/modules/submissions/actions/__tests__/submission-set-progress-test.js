jest.unmock("../submission-set-progress.js")

import { submissionSetProgress } from "../submission-set-progress.js"
import { SUBMISSION_SET_PROGRESS } from "../../constants"

describe("submissionSetProgress", () => {
  const SUBMISSION_ID = 1234
  const PROGRESS_VALUE = 34

  it("Creates an action with correct id", () => {
    expect(
      submissionSetProgress(SUBMISSION_ID, PROGRESS_VALUE).id
    ).toEqual(SUBMISSION_ID)
  })

  it("Creates an action with correct type", () => {
    expect(
      submissionSetProgress(SUBMISSION_ID, PROGRESS_VALUE).type
    ).toEqual(SUBMISSION_SET_PROGRESS)
  })

  it("Creates an action with correct percentage", () => {
    expect(
      submissionSetProgress(SUBMISSION_ID, PROGRESS_VALUE).progress
    ).toEqual(PROGRESS_VALUE)
  })
})
