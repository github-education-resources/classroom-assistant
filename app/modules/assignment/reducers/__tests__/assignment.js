jest.unmock("../assignment")
import assignment from "../assignment"

describe("assignment", () => {
  it("returns the correct initial state", () => {
    expect(assignment(undefined, {})).toEqual({
      name: "Assignment 1: Introduction to Programming",
      type: "individual"
    })
  })
})
