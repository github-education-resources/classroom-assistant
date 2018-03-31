import { expect } from "chai"

import { submissionSetCloneStatus } from "../submission-set-clone-status"
import { SUBMISSION_SET_CLONE_STATUS } from "../../constants"

describe("submissionsetCloneStatus", () => {
  const SUBMISSION_ID = 1234
  const STATUS_VALUE = "Sample Status Value"

  it("Creates an action with correct id", () => {
    expect(
      submissionSetCloneStatus(SUBMISSION_ID, STATUS_VALUE).id
    ).to.equal(SUBMISSION_ID)
  })

  it("Creates an action with correct type", () => {
    expect(
      submissionSetCloneStatus(SUBMISSION_ID, STATUS_VALUE).type
    ).to.equal(SUBMISSION_SET_CLONE_STATUS)
  })

  it("Creates an action with correct status", () => {
    expect(
      submissionSetCloneStatus(SUBMISSION_ID, STATUS_VALUE).cloneStatus
    ).to.equal(STATUS_VALUE)
  })
})
