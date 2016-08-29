jest.unmock("../setCloneProgress.js")

import setCloneProgress from "../setCloneProgress.js"
import * as actionTypes from "../../actionTypes"

describe("setCloneProgress action", () => {
  const SUBMISSION_ID = 1234
  const PROGRESS_VALUE = 34

  it("creates action with correct id", () => {
    expect(
      setCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).id
    ).toEqual(SUBMISSION_ID)
  })

  it("creates action with correct type", () => {
    expect(
      setCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).type
    ).toEqual(actionTypes.SET_CLONE_PROGRESS)
  })

  it("creates action with correct percentage", () => {
    expect(
      setCloneProgress(SUBMISSION_ID, PROGRESS_VALUE).cloneProgress
    ).toEqual(PROGRESS_VALUE)
  })
})
