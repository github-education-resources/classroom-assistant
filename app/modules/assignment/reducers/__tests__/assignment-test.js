import { expect } from "chai"

import assignment from "../assignment"

describe("assignment", () => {
  it("returns the correct initial state", () => {
    expect(assignment(undefined, {})).eql({
      name: "Assignment 1: Introduction to Programming",
      type: "individual"
    })
  })
})
