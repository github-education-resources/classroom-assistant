import { expect } from "chai"
import * as sinon from "sinon"

import { assignmentFetchInfo } from "../assignment-fetch-info"
import {ASSIGNMENT_ERROR_INFO, ASSIGNMENT_REQUEST_INFO, ASSIGNMENT_RECEIVE_INFO} from "../../constants"

const jsonOK = (body) => {
  const mockResponse = new window.Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-type": "application/json"
    }
  })
  return Promise.resolve(mockResponse)
}

describe("assignmentFetchInfo", () => {
  let invalidURLAssignment = {
    name: "Test Assignment",
    type: "individual",
    url: "invalidURL",
    isFetching: false,
    error: null,
  }

  let validAssignment = {
    name: "Test Assignment",
    type: "individual",
    url: "http://classroom.github.com/classrooms/test-org/assignments/test-assignment",
    isFetching: false,
    error: null,
  }

  it("dispatches error action on invalid URL", async () => {
    const getState = () => ({ assignment: invalidURLAssignment })
    const dispatch = sinon.spy()
    await assignmentFetchInfo()(dispatch, getState)

    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "URL is invalid ¯\\_(ツ)_/¯" })).is.true
  })

  it("dispatches request info action", async () => {
    const getState = () => ({ assignment: validAssignment })
    const dispatch = sinon.spy()
    await assignmentFetchInfo()(dispatch, getState)

    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_REQUEST_INFO })).is.true
  })

  it("dispatches error action on cannot find assignment", async () => {
    const getState = () => ({ assignment: validAssignment })
    const dispatch = sinon.spy()
    await assignmentFetchInfo()(dispatch, getState)

    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "Could not find assignment." })).is.true
  })

  it("dispatches request info and receive info action after fetch", async () => {
    const response = {name: "Test Assignment", type: "individual"}
    const getState = () => ({ assignment: validAssignment })
    const dispatch = sinon.spy()
    sinon.stub(window, "fetch")
    window.fetch.returns(jsonOK(response))
    await assignmentFetchInfo()(dispatch, getState)
    /* eslint-disable no-unused-expressions */
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_REQUEST_INFO })).is.true
    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_RECEIVE_INFO, payload: response })).is.true
    /* eslint-enable no-unused-expressions */
  })
})
