jest.unmock("../submission-set-clone-status.js")

import { submissionSetCloneStatus } from "../submission-set-clone-status.js"
import { SUBMISSION_SET_CLONE_STATUS } from "../../constants"

describe("submissionsetCloneStatus", () => {
  const SUBMISSION_ID = 1234
  const STATUS_VALUE = "Sample Status Value"

  it("Creates an action with correct id", () => {
    expect(
      submissionSetCloneStatus(SUBMISSION_ID, STATUS_VALUE).id
    ).toEqual(SUBMISSION_ID)
  })

  it("Creates an action with correct type", () => {
    expect(
      submissionSetCloneStatus(SUBMISSION_ID, STATUS_VALUE).type
    ).toEqual(SUBMISSION_SET_CLONE_STATUS)
  })

  it("Creates an action with correct status", () => {
    expect(
      submissionSetCloneStatus(SUBMISSION_ID, STATUS_VALUE).cloneStatus
    ).toEqual(STATUS_VALUE)
  })
})
