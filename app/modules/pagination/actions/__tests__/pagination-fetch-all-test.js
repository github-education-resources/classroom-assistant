import { expect } from "chai"
import * as sinon from "sinon"

import { fetchAllPages } from "../pagination-fetch-all"
import { PAGINATION_SET_ASSIGNMENT_URL, PAGINATION_SET_FETCHING } from "../../constants"

describe("paginationFetchAll", () => {
  let sampleAssignmentURL = "http://classroom.github.com/classrooms/test-org/assignments/test-assignment"

  let dispatch, getState

  beforeEach(() => {
    dispatch = sinon.stub()
    dispatch.resolves("")
    getState = sinon.stub()
    getState.onFirstCall().returns({
      pagination: {
        nextPage: 2
      }
    })
    getState.returns({
      pagination: {
        nextPage: null
      }
    })
  })

  it("dispatches set assignment URL", async () => {
    await fetchAllPages(sampleAssignmentURL)(dispatch, getState)

    expect(dispatch.calledWithMatch({type: PAGINATION_SET_ASSIGNMENT_URL, url: sampleAssignmentURL})).is.true
  })

  it("dispatches set fetching to true when starting fetch", async () => {
    await fetchAllPages(sampleAssignmentURL)(dispatch, getState)

    expect(dispatch.calledWithMatch({type: PAGINATION_SET_FETCHING, payload: true})).is.true
  })

  it("dispatches set fetching to false when ending fetch", async () => {
    await fetchAllPages(sampleAssignmentURL)(dispatch, getState)

    expect(dispatch.calledWithMatch({type: PAGINATION_SET_FETCHING, payload: false})).is.true
  })
})
