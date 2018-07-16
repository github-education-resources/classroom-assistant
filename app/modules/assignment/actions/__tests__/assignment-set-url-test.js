import { expect } from "chai"
import { setAssignmentURL } from "../assignment-set-url"
import { ASSIGNMENT_SET_URL } from "../../constants"

const TEST_URL = "https://github.com/github/github.git"

describe("assignmentSetURL", () => {
  it("sets github repo url of assignment", () => {
    expect(setAssignmentURL(TEST_URL)).eql({
      type: ASSIGNMENT_SET_URL,
      url: TEST_URL,
    })
  })
})
