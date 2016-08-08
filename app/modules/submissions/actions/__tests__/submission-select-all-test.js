jest.unmock("../submission-select-all")
import { submissionSelectAll } from "../submission-select-all"
import { SUBMISSION_SELECT_ALL } from "../../constants"

describe("submissionSelectAll", () => {
  it("creates action to select all", () => {
    expect(submissionSelectAll(true)).toEqual({
      type: SUBMISSION_SELECT_ALL,
      newValue: true
    })
  })

  it("creates action to deselect all", () => {
    expect(submissionSelectAll(false)).toEqual({
      type: SUBMISSION_SELECT_ALL,
      newValue: false
    })
  })
})
