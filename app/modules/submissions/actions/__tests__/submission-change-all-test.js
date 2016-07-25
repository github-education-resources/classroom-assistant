jest.unmock("../submission-change-all")
import { submissionChangeAll } from "../submission-change-all"
import { SUBMISSION_CHANGE_ALL } from "../../constants"

describe("submissionChangeAll", () => {
  it("creates action to select all", () => {
    expect(submissionChangeAll(true)).toEqual({
      type: SUBMISSION_CHANGE_ALL,
      newValue: true
    })
  })

  it("creates action to deselect all", () => {
    expect(submissionChangeAll(false)).toEqual({
      type: SUBMISSION_CHANGE_ALL,
      newValue: false
    })
  })
})
