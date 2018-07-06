import { expect } from "chai"

import pagination from "../pagination"
import {
  PAGINATION_RESET, PAGINATION_REQUEST, PAGINATION_RECEIVE, PAGINATION_RECEIVE_METADATA,
} from "../../constants"

let assignmentURL = "http://classroom.github.com/classrooms/test-org/assignments/test-assignment"
let nextPageId = "http://classroom.github.com/api/internal/classrooms/test-org/assignments/test-assignment/repos?page=2"

const initialPaginationState = {
  pages: [],
  fetchedAll: false,
  url: "",
}

const initialFetchingPageState = {
  id: 1,
  repoIds: [],
  isFetching: true,
}

const initialFetchingPaginationState = {
  pages: [initialFetchingPageState],
  fetchedAll: false,
  url: assignmentURL,
}

const repoIdPageState = {
  id: 1,
  repoIds: [1, 2, 3],
  isFetching: false,
}

const nextPageIdState = {
  id: 1,
  repoIds: [],
  nextPageId: nextPageId,
  isFetching: true,
}

const populatedPaginationState = {
  pages: [repoIdPageState],
  fetchedAll: true,
  url: assignmentURL
}

describe("pagination", () => {
  describe("PAGINATION_RESET", () => {
    it("returns initial state", () => {
      const action = {
        type: PAGINATION_RESET,
      }
      expect(pagination(populatedPaginationState, action)).eql(initialPaginationState)
    })
  })

  describe("PAGINATION_REQUEST", () => {
    it("adds initialized page to pages", () => {
      const action = {
        type: PAGINATION_REQUEST,
        id: 1
      }
      expect(pagination(initialPaginationState, action).pages[0]).eql(initialFetchingPageState)
    })
  })

  describe("PAGINATION_RECEIVE", () => {
    it("adds repoIds and sets isFetching to false for the right page", () => {
      const action = {
        type: PAGINATION_RECEIVE,
        id: 1,
        repoIds: [1, 2, 3]
      }
      expect(pagination(initialFetchingPaginationState, action).pages[0]).eql(repoIdPageState)
    })
  })

  describe("PAGINATION_RECEIVE_METADATA", () => {
    it("sets nextPageId for right page", () => {
      const action = {
        type: PAGINATION_RECEIVE_METADATA,
        id: 1,
        nextPageId: nextPageId
      }
      expect(pagination(initialFetchingPaginationState, action).pages[0]).eql(nextPageIdState)
    })
  })
})
