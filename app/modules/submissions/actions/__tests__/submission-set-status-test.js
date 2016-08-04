jest.unmock("../submission-set-status.js")

import { submissionSetStatus } from "../submission-set-status.js"
import { SUBMISSION_SET_STATUS } from "../../constants"

describe("submissionSetStatus", () => {
  const SUBMISSION_ID = 1234
  const STATUS_VALUE = "Sample Status Value"

  it("Creates an action with correct id", () => {
    expect(
      submissionSetStatus(SUBMISSION_ID, STATUS_VALUE).id
    ).toEqual(SUBMISSION_ID)
  })

  it("Creates an action with correct type", () => {
    expect(
      submissionSetStatus(SUBMISSION_ID, STATUS_VALUE).type
    ).toEqual(SUBMISSION_SET_STATUS)
  })

  it("Creates an action with correct status", () => {
    expect(
      submissionSetStatus(SUBMISSION_ID, STATUS_VALUE).cloneStatus
    ).toEqual(STATUS_VALUE)
  })
})
