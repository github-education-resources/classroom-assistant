import { expect } from "chai"
import { assignmentAuthorizeUser } from "../assignment-authorize-user"
import { ASSIGNMENT_AUTHORIZE_USER } from "../../constants"

describe("assignmentAuthorizeUser", () => {
  it("creates action with passed value true", () => {
    expect(assignmentAuthorizeUser(true)).eql({
      type: ASSIGNMENT_AUTHORIZE_USER,
      payload: true,
    })
  })

  it("creates action with passed value false", () => {
    expect(assignmentAuthorizeUser(false)).eql({
      type: ASSIGNMENT_AUTHORIZE_USER,
      payload: false,
    })
  })
})
