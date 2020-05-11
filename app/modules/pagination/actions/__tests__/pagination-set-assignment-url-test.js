import { expect } from "chai"
import { paginationSetAssignmentURL } from "../pagination-set-assignment-url"
import { PAGINATION_SET_ASSIGNMENT_URL } from "../../constants"

describe("paginationSetAssignmentURL", () => {
  const assignmentURL = "https://classroom.github.com/classrooms/test-org/assignments/test-assignment"

  it("creates action with correct type and url", () => {
    expect(paginationSetAssignmentURL(assignmentURL)).eql({
      type: PAGINATION_SET_ASSIGNMENT_URL,
      url: assignmentURL,
    })
  })
})
