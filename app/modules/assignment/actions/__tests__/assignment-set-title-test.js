import { expect } from "chai"
import { setAssignmentTitle } from "../assignment-set-title"
import { ASSIGNMENT_SET_TITLE } from "../../constants"

const TEST_TITLE = "Test Assignment"

describe("assignmentSetTitle", () => {
  it("sets title of assignment", () => {
    expect(setAssignmentTitle(TEST_TITLE)).eql({
      type: ASSIGNMENT_SET_TITLE,
      payload: TEST_TITLE,
    })
  })
})
