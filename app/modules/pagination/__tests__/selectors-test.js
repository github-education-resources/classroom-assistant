import { expect } from "chai"

import { isPageLeft, nextPageId, outOfDate } from "../selectors"

describe("selectors", () => {
  let assignmentURL = "http://classroom.github.com/classrooms/test-org/assignments/test-assignment"

  let initialPaginationState = {
    pages: [],
    fetchedAll: false,
    url: "",
  }

  let pageWithNext = {
    id: 1,
    repoIds: [],
    isFetching: false,
    nextPageId: 2
  }

  let lastPage = {
    id: 1,
    repoIds: [],
    isFetching: false,
  }

  let paginationWithNext = {
    pages: [pageWithNext],
    fetchedAll: true,
    url: "",
  }

  let paginationWithLast = {
    pages: [pageWithNext, lastPage],
    fetchedAll: true,
    url: "",
  }

  let paginationWithURL = {
    url: assignmentURL,
  }

  let assignmentWithLatestURL = {
    url: assignmentURL,
  }

  let assignmentWithDifferentURL = {
    url: "different url"
  }

  describe("isPageLeft", () => {
    it("returns true if there are no pages", () => {
      expect(isPageLeft({
        pagination: initialPaginationState
      })).eql(true)
    })

    it("returns true if last element has nextPageId", () => {
      expect(isPageLeft({
        pagination: paginationWithNext
      })).eql(true)
    })

    it("returns false if last element has no nextPageId", () => {
      expect(isPageLeft({
        pagination: paginationWithLast
      })).eql(false)
    })
  })

  describe("nextPageId", () => {
    it("returns 1 if there are no pages", () => {
      expect(nextPageId({
        pagination: initialPaginationState
      })).eql(1)
    })

    it("returns nextPageId of last element", () => {
      expect(nextPageId({
        pagination: paginationWithNext
      })).eql(2)
    })
  })

  describe("outOfDate", () => {
    it("returns true if assignment url does not match pagination url", () => {
      expect(outOfDate({
        pagination: paginationWithURL,
        assignmentURL: assignmentWithDifferentURL,
      })).eql(true)
    })

    it("returns false if assignment url matches pagination url", () => {
      expect(outOfDate({
        pagination: paginationWithURL,
        assignmentURL: assignmentWithLatestURL,
      })).eql(false)
    })
  })

  describe("fetchedAll", () => {

  })
})
