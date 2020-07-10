import { expect } from "chai"
import { receiveInfo } from "../assignment-receive-info"
import { ASSIGNMENT_RECEIVE_INFO } from "../../constants"

describe("assignmentReceiveInfo", () => {
  it("creates action with correct name and type", () => {
    expect(receiveInfo("Test Assignment", "individual")).eql({
      type: ASSIGNMENT_RECEIVE_INFO,
      payload: { title: "Test Assignment", type: "individual" }
    })
  })
})
