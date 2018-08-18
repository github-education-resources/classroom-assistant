import { expect } from "chai"
import * as sinon from "sinon"

import { fetchAllPages } from "../pagination-fetch-all"
import { PAGINATION_SET_ASSIGNMENT_URL, PAGINATION_SET_FETCHING } from "../../constants"

const keytar = require("keytar")

describe("paginationFetchAll", () => {
  const validAssignment = {
    title: "Test Assignment",
    type: "individual",
    url: "http://this-is-a-valid-url.com/assignments/a1",
    isFetching: true,
    error: null,
  }

  let dispatch, getState

  before(() => {
    const passwordStub = sinon.stub(keytar, "findPassword")
    passwordStub.returns("token")
  })

  after(() => {
    keytar.findPassword.restore()
  })

  beforeEach(() => {
    dispatch = sinon.stub()
    dispatch.resolves("")
    getState = sinon.stub()
    getState.onFirstCall().returns({
      pagination: {
        nextPage: 2
      },
      assignment: validAssignment,
    })
    getState.returns({
      pagination: {
        nextPage: null,
      },
      assignment: validAssignment,
    })
  })

  it("dispatches set assignment URL", async () => {
    await fetchAllPages(validAssignment.url)(dispatch, getState)

    expect(dispatch.calledWithMatch({type: PAGINATION_SET_ASSIGNMENT_URL, url: validAssignment.url})).is.true
  })

  it("dispatches set fetching to true when starting fetch", async () => {
    await fetchAllPages(validAssignment.url)(dispatch, getState)

    expect(dispatch.calledWithMatch({type: PAGINATION_SET_FETCHING, payload: true})).is.true
  })

  it("dispatches set fetching to false when ending fetch", async () => {
    await fetchAllPages(validAssignment.url)(dispatch, getState)

    expect(dispatch.calledWithMatch({type: PAGINATION_SET_FETCHING, payload: false})).is.true
  })
})
