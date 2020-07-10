import { expect } from "chai"

import { nextPage, outOfDate, fetching } from "../selectors"

describe("pagination selectors", () => {
  const assignmentURL = "https://classroom.github.com/classrooms/test-org/assignments/test-assignment"

  const initialPaginationState = {
    assignmentURL: "",
    fetching: false,
    nextPage: 1,
    submissionIds: [],
  }

  const paginationWithNext = {
    assignmentURL: "",
    fetching: true,
    nextPage: 2,
    submissionIds: [1],
  }

  const paginationWithURL = {
    assignmentURL: assignmentURL,
  }

  const assignmentWithLatestURL = {
    url: assignmentURL,
  }

  const assignmentWithDifferentURL = {
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

  describe("fetching", () => {
    it("returns false if pagination is not fetching", () => {
      expect(fetching({
        pagination: initialPaginationState,
      })).eql(false)
    })

    it("returns true if pagination is fetching", () => {
      expect(fetching({
        pagination: paginationWithNext,
      })).eql(true)
    })
  })
})
