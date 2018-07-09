import { expect } from "chai"
import * as sinon from "sinon"

import { fetchPage } from "../pagination-fetch-page"
import { PAGINATION_SET_NEXT_PAGE, PAGINATION_RECEIVE_PAGE } from "../../constants"
import { SUBMISSION_CREATE } from "../../../submissions/constants"
import LinkHeader from "http-link-header"

const jsonOK = (body, headers) => {
  const mockResponse = new window.Response(JSON.stringify(body), {
    status: 200,
    headers: headers
  })
  return Promise.resolve(mockResponse)
}

const sampleSubmission = (id) => {
  return {
    id: id,
    username: `test${id}`,
    avatarUrl: `test-avatar${id}`
  }
}

describe("paginationFetchPage", () => {
  let sampleAssignmentURL = "http://classroom.github.com/classrooms/test-org/assignments/test-assignment"

  let dispatch, getState

  let defaultHeaders = {
    "Content-Type": "application/json",
  }

  let middlePageResponseHeaders = {
    "Link": LinkHeader.parse("").set({
      rel: "next",
      uri: "sample-next.com?page=2"
    })
  }

  let sampleSubmissionIds = [1, 2]
  let populatePageResponse = sampleSubmissionIds.map((id) => sampleSubmission(id))

  beforeEach(() => {
    dispatch = sinon.spy()
    sinon.stub(window, "fetch")
  })

  afterEach(() => {
    window.fetch.restore()
  })

  it("dispatches set next page to null if there is no link header", async () => {
    window.fetch.returns(jsonOK({}, {}))
    await fetchPage(sampleAssignmentURL, 1)(dispatch, getState)
    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch({type: PAGINATION_SET_NEXT_PAGE, nextPage: null})).is.true
  })

  it("dispatches set next page to Link header value", async () => {
    window.fetch.returns(jsonOK({}, middlePageResponseHeaders))
    await fetchPage(sampleAssignmentURL, 1)(dispatch, getState)
    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch({type: PAGINATION_SET_NEXT_PAGE, nextPage: "2"})).is.true
  })

  it("dispatches receive page when response is received", async () => {
    window.fetch.returns(jsonOK(populatePageResponse, defaultHeaders))
    await fetchPage(sampleAssignmentURL, 1)(dispatch, getState)
    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch({type: PAGINATION_RECEIVE_PAGE, repoIds: sampleSubmissionIds})).is.true
  })

  it("dispatches create submission when response is received", async () => {
    window.fetch.returns(jsonOK(populatePageResponse, defaultHeaders))
    await fetchPage(sampleAssignmentURL, 1)(dispatch, getState)
    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch({type: SUBMISSION_CREATE, submissions: populatePageResponse})).is.true
  })
})
