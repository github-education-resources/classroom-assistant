import { expect } from "chai"

import pagination from "../pagination"
import {
  PAGINATION_RESET, PAGINATION_SET_NEXT_PAGE, PAGINATION_RECEIVE_PAGE,
} from "../../constants"

const assignmentURL = "https://classroom.github.com/classrooms/test-org/assignments/test-assignment"

const initialPaginationState = {
  assignmentURL: "",
  fetching: false,
  nextPage: 1,
  submissionIds: [],
}

const populatedPaginationState = {
  assignmentURL: assignmentURL,
  fetching: false,
  nextPage: null,
  submissionIds: [1, 2],
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

  describe("PAGINATION_RECEIVE_PAGE", () => {
    it("adds repo ids to submissionIds", () => {
      const action = {
        type: PAGINATION_RECEIVE_PAGE,
        repoIds: [1, 2, 3]
      }
      expect(pagination(initialPaginationState, action).submissionIds).eql([1, 2, 3])
    })
  })

  describe("PAGINATION_SET_NEXT_PAGE", () => {
    it("sets nextPage to correct value", () => {
      const action = {
        type: PAGINATION_SET_NEXT_PAGE,
        nextPage: 2
      }
      expect(pagination(initialPaginationState, action).nextPage).eql(2)
    })
  })
})
