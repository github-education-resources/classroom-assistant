import { expect } from "chai"
import { assignmentReset } from "../assignment-reset"
import { ASSIGNMENT_RESET } from "../../constants"

describe("assignmentReceiveInfo", () => {
  it("creates action with correct name and type", () => {
    expect(assignmentReset()).eql({
      type: ASSIGNMENT_RESET,
    })
  })
})
