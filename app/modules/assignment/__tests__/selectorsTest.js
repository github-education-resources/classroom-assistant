jest.unmock("../selectors.js")

import { all, typeLabel, name } from "../selectors.js"

describe("Assignment selectors", () => {
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
      })).toBe(testIndividualAssignment)
    })
  })

  describe("typeLabel", () => {
    it("returns correct label for individual assignment", () => {
      expect(typeLabel({
        assignment: testIndividualAssignment
      })).toBe("Individual Assignment")
    })

    it("returns correct label for group assignment", () => {
      expect(typeLabel({
        assignment: testGroupAssignment
      })).toBe("Group Assignment")
    })

    it("returns default label for invalid assignment types", () => {
      expect(typeLabel({
        assignment: testInvalidAssignment
      })).toBe("Unknown Assignment Type")
    })
  })

  describe("name", () => {
    it("returns the name of the assignment", () => {
      expect(name({
        assignment: testIndividualAssignment
      })).toBe(testIndividualAssignment.name)
    })
  })
})
