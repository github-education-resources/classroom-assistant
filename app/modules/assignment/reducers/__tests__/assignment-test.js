import { expect } from "chai"

import assignment from "../assignment"
import { ASSIGNMENT_RECEIVE_INFO, ASSIGNMENT_RESET } from "../../constants"

const initialState = {
  title: null,
  type: null,
  url: null,
  isFetching: false,
  error: null,
}

const populatedState = {
  title: "Test Assignment",
  type: "individual",
  url: null,
  isFetching: false,
  error: null,
}

describe("assignments reducer", () => {
  it("returns the correct initial state", () => {
    expect(assignment(undefined, {})).eql(initialState)
  })

  it("sets name and type on receive info", () => {
    const receiveAction = {
      type: ASSIGNMENT_RECEIVE_INFO,
      payload:
        {
          title: "Test Assignment",
          type: "individual",
        }
    }
    expect(assignment(initialState, receiveAction)).to.eql(populatedState)
  })

  it("returns initial state on reset", () => {
    const resetAction = {
      type: ASSIGNMENT_RESET,
    }
    expect(assignment(populatedState, resetAction)).to.eql(initialState)
  })
})
