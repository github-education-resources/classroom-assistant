import { expect } from "chai"

import assignment from "../assignment"
import {ASSIGNMENT_RECEIVE_INFO} from "../../constants"

const initialState = {
  name: "",
  type: "",
  url: "",
  isFetching: false,
  error: null,
}

const populatedState = {
  name: "Test Assignment",
  type: "individual",
  url: "",
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
          name: "Test Assignment",
          type: "individual",
        }
    }
    expect(assignment(initialState, receiveAction)).to.eql(populatedState)
  })
})
