import { expect } from "chai"
import { setAssignmentType } from "../assignment-set-type"
import { ASSIGNMENT_SET_TYPE } from "../../constants"

describe("assignmentSetType", () => {
  it("sets type to individual", () => {
    expect(setAssignmentType("individual")).eql({
      type: ASSIGNMENT_SET_TYPE,
      payload: "individual",
    })
  })

  it("sets type to group", () => {
    expect(setAssignmentType("group")).eql({
      type: ASSIGNMENT_SET_TYPE,
      payload: "group",
    })
  })
})
