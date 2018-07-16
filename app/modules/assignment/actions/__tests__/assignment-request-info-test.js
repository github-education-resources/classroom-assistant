import { expect } from "chai"
import { requestInfo } from "../assignment-request-info"
import { ASSIGNMENT_REQUEST_INFO } from "../../constants"

describe("assignmentRequestInfo", () => {
  it("creates action with correct type", () => {
    expect(requestInfo()).eql({
      type: ASSIGNMENT_REQUEST_INFO,
    })
  })
})
