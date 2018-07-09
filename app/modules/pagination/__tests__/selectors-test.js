import { expect } from "chai"

import { nextPage, outOfDate } from "../selectors"

describe("selectors", () => {
  let assignmentURL = "http://classroom.github.com/classrooms/test-org/assignments/test-assignment"

  let initialPaginationState = {
    assignmentURL: "",
    fetching: false,
    nextPage: 1,
    submissionIds: [],
  }

  let paginationWithNext = {
    assignmentURL: "",
    fetching: true,
    nextPage: 2,
    submissionIds: [1],
  }

  let paginationWithURL = {
    assignmentURL: assignmentURL,
  }

  let assignmentWithLatestURL = {
    url: assignmentURL,
  }

  let assignmentWithDifferentURL = {
    url: "different url"
  }

  describe("nextPage", () => {
    it("returns 1 if there are no pages", () => {
      expect(nextPage({
        pagination: initialPaginationState
      })).eql(1)
    })

    it("returns nextPage of last element", () => {
      expect(nextPage({
        pagination: paginationWithNext
      })).eql(2)
    })
  })

  describe("outOfDate", () => {
    it("returns true if assignment url does not match pagination url", () => {
      expect(outOfDate({
        pagination: paginationWithURL,
        assignment: assignmentWithDifferentURL,
      })).eql(true)
    })

    it("returns false if assignment url matches pagination url", () => {
      expect(outOfDate({
        pagination: paginationWithURL,
        assignment: assignmentWithLatestURL,
      })).eql(false)
    })
  })

  describe("fetchedAll", () => {

  })
})
