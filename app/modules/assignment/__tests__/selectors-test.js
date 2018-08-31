import { expect } from "chai"

import { all, typeLabel, name, url, error, valid, fetching } from "../selectors"

describe("assignment selectors", () => {
  const testIndividualAssignment = {
    title: "Assignment 1: Introduction to Programming",
    type: "individual",
    url: "",
    isFetching: false,
  }

  const testGroupAssignment = {
    title: "Assignment 1: Introduction to Programming",
    type: "group",
    url: "",
    isFetching: false,
  }

  const testInvalidTypeAssignment = {
    title: "Assignment 1: Introduction to Programming",
    type: "somethingelse"
  }

  const testInvalidNameAssignment = {
    type: "individual",
  }

  const testErrorAssignment = {
    title: "Assignment 1: Introduction to Programming",
    type: "individual",
    error: "Test Error",
  }

  describe("all", () => {
    it("returns whole assignment object given state", () => {
      expect(all({
        assignment: testIndividualAssignment
      })).eql(testIndividualAssignment)
    })
  })

  describe("typeLabel", () => {
    it("returns correct label for individual assignment", () => {
      expect(typeLabel({
        assignment: testIndividualAssignment
      })).to.equal("Individual Assignment")
    })

    it("returns correct label for group assignment", () => {
      expect(typeLabel({
        assignment: testGroupAssignment
      })).to.equal("Group Assignment")
    })

    it("returns default label for invalid assignment types", () => {
      expect(typeLabel({
        assignment: testInvalidTypeAssignment
      })).to.equal("Unknown Assignment Type")
    })
  })

  describe("name", () => {
    it("returns the name of the assignment", () => {
      expect(name({
        assignment: testIndividualAssignment
      })).to.equal(testIndividualAssignment.title)
    })
  })

  describe("url", () => {
    it("returns the url of the assignment", () => {
      expect(url({
        assignment: testIndividualAssignment
      })).to.equal(testIndividualAssignment.url)
    })
  })

  describe("fetching", () => {
    it("returns the fetching state of the assignment", () => {
      expect(fetching({
        assignment: testIndividualAssignment
      })).to.equal(testIndividualAssignment.isFetching)
    })
  })

  describe("error", () => {
    it("returns the error message of the assignment", () => {
      expect(error({
        assignment: testErrorAssignment
      })).to.equal(testErrorAssignment.error)
    })
  })

  describe("invalid assignment", () => {
    it("returns false for invalid", () => {
      expect(valid({
        assignment: testInvalidNameAssignment
      })).to.equal(false)
    })
  })
})
