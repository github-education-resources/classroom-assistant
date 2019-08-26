import { expect } from "chai"
import * as sinon from "sinon"
import { verifyAssignmentURL } from "../assignment-verify-url"
import { ASSIGNMENT_SET_URL, ASSIGNMENT_ERROR_INFO } from "../../constants"

describe("assignmentVerifyURL", () => {
  let dispatch

  beforeEach(() => {
    dispatch = sinon.spy()
  })

  it("dispatches error action on invalid server", async () => {
    const invalidURL = "https://BAD_SERVER/classrooms/test/assignments/test"

    await verifyAssignmentURL(invalidURL)(dispatch, null)
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "URL is invalid!" })).is.true
  })

  it("dispatches error action on invalid assignment type", async () => {
    const invalidURL = "https://classroom.github.com/classrooms/test/not-assignments/test"

    await verifyAssignmentURL(invalidURL)(dispatch, null)
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "URL is invalid!" })).is.true
  })

  it("dispatches error action on invalid classroom name", async () => {
    const invalidURL = "https://classroom.github.com/classrooms/test@badname/not-assignments/test"

    await verifyAssignmentURL(invalidURL)(dispatch, null)
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "URL is invalid!" })).is.true
  })

  it("dispatches error action on invalid assignment name", async () => {
    const invalidURL = "https://classroom.github.com/classrooms/test/not-assignments/test@badn@me*"

    await verifyAssignmentURL(invalidURL)(dispatch, null)
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "URL is invalid!" })).is.true
  })

  it("dispatches set url action with valid assignment URL", async () => {
    const validAssignmentURL = "https://classroom.github.com/classrooms/test/assignments/test"
    await verifyAssignmentURL(validAssignmentURL)(dispatch, null)

    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_SET_URL, url: validAssignmentURL })).is.true
  })

  it("dispatches set url action with valid group assignment URL", async () => {
    const validGroupAssignmentURL = "https://classroom.github.com/classrooms/test/group-assignments/test"
    await verifyAssignmentURL(validGroupAssignmentURL)(dispatch, null)

    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_SET_URL, url: validGroupAssignmentURL })).is.true
  })
})
