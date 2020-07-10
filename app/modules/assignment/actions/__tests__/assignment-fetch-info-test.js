import { expect } from "chai"
import * as sinon from "sinon"
import nock from "nock"
import { remote } from "electron"

import { assignmentFetchInfo } from "../assignment-fetch-info"
import { ASSIGNMENT_ERROR_INFO, ASSIGNMENT_REQUEST_INFO, ASSIGNMENT_RECEIVE_INFO } from "../../constants"

const ACCESS_TOKEN = "token"

describe("assignmentFetchInfo", () => {
  let dispatch, assignmentStub

  const invalidURLAssignment = {
    title: "Test Assignment",
    type: "individual",
    url: "invalidURL",
    isFetching: false,
    error: null,
  }

  const validAssignment = {
    title: "Test Assignment",
    type: "individual",
    url: "https://classroom.github.com/assignments/a1",
    isFetching: false,
    error: null,
  }

  const validSettings = {
    username: "testUser",
  }

  beforeEach(() => {
    dispatch = sinon.spy()

    assignmentStub = nock("https://classroom.github.com")
      .get("/api/internal/assignments/a1")
      .query({ access_token: ACCESS_TOKEN })

    const passwordStub = sinon.stub(remote, "getGlobal")
    passwordStub.returns(ACCESS_TOKEN)
  })

  afterEach(() => {
    remote.getGlobal.restore()
    nock.cleanAll()
  })

  it("dispatches error action on invalid URL", async () => {
    const getState = () => ({ assignment: invalidURLAssignment, settings: validSettings })
    await assignmentFetchInfo()(dispatch, getState)

    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "URL is invalid!" })).is.true
  })

  it("dispatches request info action", async () => {
    const getState = () => ({ assignment: validAssignment, settings: validSettings })
    await assignmentFetchInfo()(dispatch, getState)
    assignmentStub.reply(200, { })

    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_REQUEST_INFO })).is.true
  })

  it("dispatches error action on cannot find assignment", async () => {
    const getState = () => ({ assignment: validAssignment, settings: validSettings })
    assignmentStub.reply(200, { })
    await assignmentFetchInfo()(dispatch, getState)

    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_ERROR_INFO, error: "Could not find assignment." })).is.true
  })

  it("dispatches receive info action after fetch", async () => {
    const getState = () => ({ assignment: validAssignment, settings: validSettings })
    const response = {
      title: "Test Assignment",
      type: "individual",
    }
    assignmentStub.reply(200, response)
    await assignmentFetchInfo()(dispatch, getState)

    expect(dispatch.calledWithMatch({ type: ASSIGNMENT_RECEIVE_INFO, payload: response })).is.true
  })
})
