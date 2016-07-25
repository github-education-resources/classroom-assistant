jest.unmock("../submission-receive-clone-progress.js")

import { submissionReceiveCloneProgress } from "../submission-receive-clone-progress.js"
import { SUBMISSION_RECEIVE_CLONE_PROGRESS } from "../../constants"

describe("submissionReceiveCloneProgress", () => {
  const SUBMISSION_ID = 1234
  const PROGRESS_VALUE = 34

  it("Creates an action with correct id", () => {
    expect(
      submissionReceiveCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).id
    ).toEqual(SUBMISSION_ID)
  })

  it("Creates an action with correct type", () => {
    expect(
      submissionReceiveCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).type
    ).toEqual(SUBMISSION_RECEIVE_CLONE_PROGRESS)
  })

  it("Creates an action with correct percentage", () => {
    expect(
      submissionReceiveCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).progress
    ).toEqual(PROGRESS_VALUE)
  })
})
