import { expect } from "chai"

import { all, typeLabel, name } from "../selectors.js"

describe("assignment selectors", () => {
  let testIndividualAssignment = {
    name: "Assignment 1: Introduction to Programming",
    type: "individual"
  }

  let testGroupAssignment = {
    name: "Assignment 1: Introduction to Programming",
    type: "group"
  }

  let testInvalidAssignment = {
    name: "Assignment 1: Introduction to Programming",
    type: "somethingelse"
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
        assignment: testInvalidAssignment
      })).to.equal("Unknown Assignment Type")
    })
  })

  describe("name", () => {
    it("returns the name of the assignment", () => {
      expect(name({
        assignment: testIndividualAssignment
      })).to.equal(testIndividualAssignment.name)
    })
  })
})
