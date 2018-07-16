import { expect } from "chai"
import { errorInfo } from "../assignment-error-info"
import { ASSIGNMENT_ERROR_INFO } from "../../constants"

describe("assignmentErrorInfo", () => {
  it("creates action with passed error message", () => {
    const errorMessage = "Test Error"
    expect(errorInfo(errorMessage)).eql({
      type: ASSIGNMENT_ERROR_INFO,
      error: errorMessage,
    })
  })
})
