import { expect } from "chai"
import { submissionSelectAll } from "../submission-select-all"
import { SUBMISSION_SELECT_ALL } from "../../constants"

describe("submissionSelectAll", () => {
  it("creates action to select all", () => {
    expect(submissionSelectAll(true)).eql({
      type: SUBMISSION_SELECT_ALL,
      newValue: true
    })
  })

  it("creates action to deselect all", () => {
    expect(submissionSelectAll(false)).eql({
      type: SUBMISSION_SELECT_ALL,
      newValue: false
    })
  })
})
