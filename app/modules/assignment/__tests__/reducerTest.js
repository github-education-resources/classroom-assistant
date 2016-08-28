jest.unmock("../reducer")
import assignment from "../reducer"

describe("Assignment Reducer", () => {
  it("returns the correct initial state", () => {
    expect(assignment(undefined, {})).toEqual({
      name: "Assignment 1: Introduction to Programming",
      type: "individual"
    })
  })
})
