import { expect } from "chai"
import * as sinon from "sinon"
import nock from "nock"

import { fetchPage } from "../pagination-fetch-page"
import { PAGINATION_SET_NEXT_PAGE, PAGINATION_RECEIVE_PAGE } from "../../constants"
import { SUBMISSION_CREATE } from "../../../submissions/constants"
import LinkHeader from "http-link-header"

const sampleSubmission = (id) => {
  return {
    id: id,
    username: `test${id}`,
    avatarUrl: `test-avatar${id}`,
    rosterIdentifier: `identifier${id}`
  }
}

describe("paginationFetchPage", () => {
  const sampleAssignmentURL = "https://classroom.github.com/classrooms/test-org/assignments/test-assignment"

  let dispatch, assignmentStub

  const defaultHeaders = {
    "Content-Type": "application/json",
  }

  const middlePageResponseHeaders = {
    Link: LinkHeader.parse("").set({
      rel: "next",
      uri: "sample-next.com?page=2"
    }).toString()
  }

  const sampleSubmissionIds = [1, 2]
  const populatePageResponse = sampleSubmissionIds.map((id) => sampleSubmission(id))

  beforeEach(() => {
    dispatch = sinon.spy()
    assignmentStub = nock("https://classroom.github.com")
      .defaultReplyHeaders(defaultHeaders)
      .get("/classrooms/test-org/assignments/test-assignment")
  })

  afterEach(() => {

  })

  it("dispatches set next page to null if there is no link header", async () => {
    assignmentStub
      .query({ page: "1", access_token: "token" })
      .reply(200, [])

    await fetchPage(sampleAssignmentURL, 1, "token")(dispatch)

    expect(dispatch.calledWithMatch({ type: PAGINATION_SET_NEXT_PAGE, nextPage: null })).is.true
  })

  it("dispatches set next page to Link header value", async () => {
    assignmentStub
      .query({ page: "1", access_token: "token" })
      .reply(200, [], middlePageResponseHeaders)

    await fetchPage(sampleAssignmentURL, 1, "token")(dispatch)

    expect(dispatch.calledWithMatch({ type: PAGINATION_SET_NEXT_PAGE, nextPage: "2" })).is.true
  })

  it("dispatches receive page when response is received", async () => {
    assignmentStub
      .query({ page: "1", access_token: "token" })
      .reply(200, populatePageResponse)

    await fetchPage(sampleAssignmentURL, 1, "token")(dispatch)

    expect(dispatch.calledWithMatch({ type: PAGINATION_RECEIVE_PAGE, repoIds: sampleSubmissionIds })).is.true
  })

  it("dispatches create submission when response is received", async () => {
    assignmentStub
      .query({ page: "1", access_token: "token" })
      .reply(200, populatePageResponse)

    await fetchPage(sampleAssignmentURL, 1, "token")(dispatch)

    expect(dispatch.calledWithMatch({ type: SUBMISSION_CREATE, submissions: populatePageResponse })).is.true
  })
})
