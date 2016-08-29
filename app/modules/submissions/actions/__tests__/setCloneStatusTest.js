jest.unmock("../setCloneStatus.js")

import setCloneStatus from "../setCloneStatus.js"
import * as actionTypes from "../../actionTypes"

describe("setCloneStatus action", () => {
  const SUBMISSION_ID = 1234
  const STATUS_VALUE = "Sample Status Value"

  it("creates action with correct id", () => {
    expect(
      setCloneStatus(SUBMISSION_ID, STATUS_VALUE).id
    ).toEqual(SUBMISSION_ID)
  })

  it("creates action with correct type", () => {
    expect(
      setCloneStatus(SUBMISSION_ID, STATUS_VALUE).type
    ).toEqual(actionTypes.SET_CLONE_STATUS)
  })

  it("creates action with correct status", () => {
    expect(
      setCloneStatus(SUBMISSION_ID, STATUS_VALUE).cloneStatus
    ).toEqual(STATUS_VALUE)
  })
})
